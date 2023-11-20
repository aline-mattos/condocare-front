import { Component } from '@angular/core'
import { addDays, format } from 'date-fns';
import { DataService } from '../../services/dataService/data.service'
import { Service } from 'src/app/model/Service'
import { Delivery } from 'src/app/model/Delivery'
import { DeliveryService } from '../../services/deliveryService/delivery.service'
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent {

  constructor(private dataService: DataService, 
    private deliveryService: DeliveryService, 
    private userService: UserService) {

    this.formatedDate = format(new Date(), 'dd/MM/yyyy')
    this.dataService.getAllServices().subscribe((response: any) => {
      this.servicesData = response
    })
    this.deliveryService.getAllDeliveries().subscribe((response: any) => {
      this.deliveriesData = response
    })
    this.userService.getAllUsers().subscribe((response: any) => {
      this.usersData = response
    })
  }

  //date variables
  formatedDate: string;
  selectedDate: string = ''

  //toggle forms
  registerSelectedId: number | null = null
  registerData: any;
  registerSelectedTitle: string = ''
  showForm: boolean = false
  showServiceForm = false
  showDeliveryForm = false
  showUserForm = false
  servicesData: any[] = []

  //crud services
  newServiceData = {
    name: '',
    type: '',
  }
  
  services: any[] = []
  serviceToEdit: any = {}
  showEditServiceForm: boolean = false
  updatedData: any = {}

  registerService() {
    var service = new Service()
    service.id = ""
    service.name = this.newServiceData.name,
    service.type = this.newServiceData.type,

    this.dataService.createService(service).subscribe((response: any) => {
      console.log('Novo serviço criado:', response)
      this.servicesData.push(response)
    })

    this.showServiceForm = false;
  }

  openEditServiceForm(service: any) {
    this.serviceToEdit = { ...service };
    this.registerData = this. servicesType.map((service) => ({
      name: service.name,
    })); 
    this.showEditServiceForm = true; 
  }

  updateService(serviceId: string) {
    var service = new Service()
    service.id = ""
    service.name = this.serviceToEdit.name,
    service.type = this.serviceToEdit.type,

    this.dataService.updateService(serviceId, service).subscribe(
      (response: any) => {
        console.log('Serviço atualizado:', response)
        this.dataService.getAllServices().subscribe((updatedServices: any) => {
          this.servicesData = updatedServices
          this.showEditServiceForm = false
        })
      },
      (error: any) => {
        console.error('Erro ao atualizar o serviço:', error)
      }
    )
  }

  excludeService(serviceId: string) {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      this.dataService.deleteService(serviceId).subscribe(
        () => {
          console.log('Serviço excluído com sucesso!')
          
          this.servicesData = this.servicesData.filter(
            (service) => service.id !== serviceId
          );
        },
        (error: any) => {
          console.error('Erro ao excluir o serviço:', error)
        }
      )
    }
  }

  //crud deliveries
  newDeliveryData = {
    name: '',
    type: '',
    apartment: '',
    block: '',
    receivedDate: '',
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
      const nextDay = addDays(date, 1);
      const brasiliaNextDay = format(nextDay, 'dd/MM/yyyy');
      return brasiliaNextDay;
    } else {
      return 'Data inválida';
    }
  }
  
  deliveriesData: any[] = []
  deliveryToEdit: any = {}
  showEditDeliveryForm: boolean = false
  updatedDelivery: any = {}

  registerDelivery() {
    var delivery = new Delivery()
    delivery.id = ""
    delivery.type = this.newDeliveryData.type,
    delivery.apartment = this.newDeliveryData.apartment,
    delivery.block = this.newDeliveryData.block,
    delivery.receivedDate = this.newDeliveryData.receivedDate;

    this.deliveryService.createDelivery(delivery).subscribe((response: any) => {
      console.log('Nova encomenda criada:', response)
      this.deliveriesData.push(response)
    })

    this.showDeliveryForm = false;
  }

  openEditDeliveryForm(delivery: any) {
    this.deliveryToEdit = { ...delivery };
    this.registerData = this.deliveryType.map((delivery) => ({
      type: delivery.type,
    })); 
    this.showEditDeliveryForm = true; 
  }

  updateDelivery(deliveryId: string) {
    var delivery = new Delivery()
    delivery.id = ""
    delivery.type = this.deliveryToEdit.type,
    delivery.apartment = this.deliveryToEdit.apartment,
    delivery.block = this.deliveryToEdit.block,
    delivery.receivedDate = this.deliveryToEdit.receivedDate

    this.deliveryService.updateDelivery(deliveryId, delivery).subscribe(
      (response: any) => {
        console.log('Encomenda atualizada:', response)
        this.deliveryService.getAllDeliveries().subscribe((updatedDelivery: any) => {
          this.deliveriesData = updatedDelivery
          this.showEditDeliveryForm = false
        })
      },
      (error: any) => {
        console.error('Erro ao atualizar a encomenda:', error)
      }
    )
  }

  excludeDelivery(deliveryId: string) {
    if (confirm('Tem certeza que deseja excluir esta encomenda?')) {
      this.deliveryService.deleteDelivery(deliveryId).subscribe(
        () => {
          console.log('Encomenda excluída com sucesso!')
          
          this.deliveriesData = this.deliveriesData.filter(
            (delivery) => delivery.id !== deliveryId
          );
        },
        (error: any) => {
          console.error('Erro ao excluir a encomenda:', error)
        }
      )
    }
  }

  //rud user
  newUserData = {
    name: '',
    apartment: '',
    block: '',
    email: ''
  }
  
  usersData: any[] = []
  userToEdit: any = {}
  showEditUserForm: boolean = false
  updatedUser: any = {}

  openUserForm(user: any) {
    this.userToEdit = { ...user };
    this.registerData = this.usersData.map((user) => ({
      name: user.name,
    })); 
    this.showUserForm = true; 
  }

  updateUser(userId: string) {
    const userToUpdate = {
      id: this.userToEdit.id,
      type: this.userToEdit.type,
      token: this.userToEdit.token,
      password: this.userToEdit.password,
      name: this.userToEdit.name,
      email: this.userToEdit.email,
      apartment: this.userToEdit.apartment,
      block: this.userToEdit.block,
    };

    this.userService.updateUser(userId, userToUpdate).subscribe(
      (response: any) => {
        console.log('Usuário atualizado:', response)
        this.userService.getAllUsers().subscribe((updatedUser: any) => {
          this.usersData = updatedUser
          this.showUserForm = false
        })
      },
      (error: any) => {
        console.error('Erro ao atualizar o usuário:', error)
      }
    )
  }

  excludeUser(userId: string) {
    if (confirm('Tem certeza que deseja excluir este usuário??')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('Usuário excluída com sucesso!')
          
          this.usersData = this.usersData.filter(
            (user) => user.id !== userId
          );
        },
        (error: any) => {
          console.error('Erro ao excluir o usuário:', error)
        }
      )
    }
  }

  toggleForm(button: { id: number; title: string }): void {
    if (this.registerSelectedId === button.id) {
      this.registerSelectedId = null;
      this.showForm = false;
    } else {
      this.registerSelectedId = button.id;
      this.showForm = true;

      this.registerSelectedTitle = button.title;

      switch (button.id) {
        case 1:
          this.registerData = this. servicesType;
          this.showServiceForm = true;
          this.showDeliveryForm = false;
          this.showUserForm = false;

          break;
        case 2:
          this.registerData = this.deliveriesData;
          this.showServiceForm = false;
          this.showDeliveryForm = true;
          this.showUserForm = false;
          break;
        case 3:
          this.registerData = this.usersData;
          this.showServiceForm = false;
          this.showDeliveryForm = false;
          this.showUserForm = true;

          break;
        default:
          break;
      }
    }
  }

  //placeholder data
  buttonsData = [
    { id: 1, title: 'NOVO SERVIÇO', urlImage: '../../../assets/service.png' },
    { id: 2, title: 'NOVA ENCOMENDA', urlImage: '../../../assets/delivery.png', },
  ]

   servicesType = [
    { id: 1, name: 'Área Comum' },
    { id: 2, name: 'Lavanderia' },
  ]

  deliveryType = [
    { id: 1, type: 'Pacote' },
    { id: 2, type: 'Saco' },
    { id: 3, type: 'Caixa' },
  ]
  
  //cancel and close new register
  cancel() {
    this.registerSelectedId = null;

    this.showServiceForm = false;
    this.showDeliveryForm = false;
    this.showUserForm = false;
  }

  cancelEdit() {
    this.showEditServiceForm = false
    this.showEditDeliveryForm = false
    this.showEditUserForm = false
  }
}
