import { Component } from '@angular/core'
import { format } from 'date-fns';
import { UserService } from 'src/app/services/userService/user.service'
import { ReservationService } from 'src/app/services/reservationService/reservation.service'
import { Reservation } from 'src/app/model/Reservation'
import { DataService } from 'src/app/services/dataService/data.service'
import { Service } from 'src/app/model/Service';
import { DeliveryService } from 'src/app/services/deliveryService/delivery.service'
import { TokenService } from 'src/app/services/tokenService/token.service';

@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.component.html',
  styleUrls: ['./home-auth.component.css']
})

export class HomeAuthComponent {

  constructor(private userService: UserService, 
    private reservationService: ReservationService, 
    private dataService: DataService, 
    private deliveryService: DeliveryService,
    private tokenService: TokenService) {

    this.reservationService.getAllReservations().subscribe((response: any) => {
      this.reservationsData = response
    })
    this.dataService.getAllServices().subscribe((response: any) => {
      this.servicesData = response;
    })
  }

    ngOnInit() {
      // Obtendo o usuário autenticado
      const authenticatedUser = this.tokenService.getToken(); // Verifique se este é o método correto para obter o usuário autenticado

        if (authenticatedUser !== null) {
          this.userService.getUser(authenticatedUser).subscribe((response: any) => {
            this.usersData = response;
            const userBlock = response.block; // Obtenha o bloco do usuário, ajuste conforme a estrutura do seu objeto de usuário
            const userApartment = response.apartment; // Obtenha o apartamento do usuário, ajuste conforme a estrutura do seu objeto de usuário
            
            this.deliveryService.getDataResident(userBlock, userApartment).subscribe((deliveryResponse: any) => {
              this.deliveriesData = deliveryResponse;
          })
          this.deliveryService.getAllDeliveries().subscribe((deliveryResponse: any) => {
            this.deliveriesData = deliveryResponse;
          })
        })
      }
    }

  currentDate: string = format(new Date(), 'yyyy-MM-dd')

  //reservation toggle form
  selectedServicoId: number | null = null;
  selectedCardTitle: string = ''

  usersData: any[] = []
  reservationsData: any[] = []
  reservationToEdit: any = {}
  showEditForm: boolean = false
  updatedreservation: any = {}


  //cards
  cardsData = [
    { id: 1, title: 'Áreas Comuns', urlImage: '../../assets/common-area.png'},
    { id: 2, title: 'Lavanderia', urlImage: '../../assets/laundry.png'},
  ]
  servicesType = [
    { name: 'Área Comum' },
    { name: 'Lavanderia' },
  ]

  //reservation form (toggle)
  selectedCardId: number | null = null
  showForm: boolean = false;
  servicesData: any[] = []
  selectedServiceId: string = ''
  selectedDate: string = ''

  toggleForm(card: { id: number, title: string }): void {
    if (this.selectedCardId === card.id) {
        this.selectedCardId = null;
        this.showForm = false;
    } else {
        this.selectedCardId = card.id;
        this.showForm = true;

        this.selectedCardTitle = card.title;

        if (card.title === 'Áreas Comuns') {
      this.dataService.getServiceByType('Área Comum').subscribe((response: any) => {
        this.servicesData = response;
      });
    } else if (card.title === 'Lavanderia') {
      this.dataService.getServiceByType('Lavanderia').subscribe((response: any) => {
        this.servicesData = response;
      });
    }
    }
  }
  
  registerReservation() {
    if(this.selectedServiceId != '' && this.selectedDate != '') {
      var selectedService: Service | undefined

      this.servicesData.forEach((data) => {
        if (data.id === this.selectedServiceId) {
          selectedService = data as Service
        }
      })

      if(selectedService != undefined) {
        var reservation = new Reservation()
        reservation.id = "",
        reservation.type = selectedService.type,
        reservation.name = selectedService.name,
        reservation.date = this.selectedDate
    
        this.reservationService.createReservation(reservation).subscribe((response: any) => {
          console.log('Nova reserva criada:', response)
          this.reservationsData.push(response)
        })
    
        this.showForm = false;
      }
    } else {
      alert("Algo deu errado")
    }
  }


  openEditForm(reservationToEdit: any) {
    this.reservationToEdit = { ...reservationToEdit };
    this.showEditForm = true;
    this.showForm = false;
    this.dataService.getAllServices().subscribe((response: any) => {
      this.servicesData = response;
    })
  }
  

  updateReservation(reservationId: string) {
    if (this.reservationToEdit.type !== '') {
      var selectedService = null
      
      this.servicesData.forEach((data) => {
        if (data.id === this.selectedServiceId) {
          selectedService = data as Service
        }
      })
  
      if (selectedService) {
        const originalDate = this.reservationToEdit.date;
  
        this.reservationToEdit.name = (selectedService as Service).name;
        this.reservationToEdit.type = (selectedService as Service).type;
        this.reservationToEdit.date = originalDate;
  
        this.reservationService.updateReservation(reservationId, this.reservationToEdit).subscribe((response: any) => {
          console.log('Reserva atualizada:', response);
          
          const index = this.reservationsData.findIndex(reservation => reservation.id === reservationId);
          if (index !== -1) {
            this.reservationsData[index] = response;
          }
        });
  
        this.showEditForm = false;
      }
    } else {
      alert('Algo deu errado');
    }
  } 
  
  exclude(reservationId: string) {
    const confirmation = confirm('Tem certeza de que deseja excluir esta reserva?');
  
    if (confirmation) {
      this.reservationService.deleteReservation(reservationId).subscribe(() => {
        // Remove a reserva do array local
        this.reservationsData = this.reservationsData.filter(reservation => reservation.id !== reservationId);
      }, error => {
        console.error('Erro ao excluir a reserva:', error);
      });
    }
  }

  deliveriesData = [ { type: 'Caixa', date: '17/11/2023' }]

  cancel() {
    this.showForm = false
    this.showEditForm = false
  }

}
