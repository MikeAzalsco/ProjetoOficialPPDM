import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage {

  listaDeCompra: { nome: string, valor: number, quantidade: number }[] = [];
  itemAComprar = "";
  valorACobrar : number = 0;
  quantidadeAComprar : number = 0;

  constructor(public alert: AlertController) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  adicionarItem() {
    if (this.itemAComprar.length > 0 && this.valorACobrar && this.quantidadeAComprar) {
      let item = {nome: this.itemAComprar, valor: this.valorACobrar, quantidade: this.quantidadeAComprar
      };
      this.listaDeCompra.push(item);
      this.itemAComprar = "";
      this.valorACobrar = 0;
      this.quantidadeAComprar = 0;
    }
  }

  apagarItem(index:number) {
    this.listaDeCompra.splice(index, 1);
  }

  async editarItem(index:number){
    let meuAlert = await this.alert.create({
        header: 'Editar Item',
        message: 'Insira novo nome',
        inputs: [ { name: 'editarNome', placeholder: 'Item..' },
        {name:'editarValor', placeholder:'Valor..' },
        {name:'editarquantidade', placeholder:'Quantidade..' }],
        buttons: [ { text: 'Cancelar', role: 'cancel'},
                  { text: 'Confirmar', handler: data => {
                      this.listaDeCompra[index].nome = data.editarNome;
                      this.listaDeCompra[index].valor = data.editarValor;
                      this.listaDeCompra[index].quantidade = data.editarquantidade;
                  } }
                ]
    });
    await meuAlert.present();
  }

}
