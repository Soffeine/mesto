export class Section {
    constructor({data, renderer}, cardContainer) {
        this._renderItems = data;
        this._renderer = renderer;
        this._cardContainer = document.querySelector(cardContainer);
    }
    
    //метод, который отрисовывает элементы на страницу
    createItems() {
      this._renderItems.forEach(item => {
          this._renderer(item);
      })
    }
    
    //метод, который добавляет элементы в разметку
    addItem(element) {
        this._cardContainer.prepend(element)
    }
}
