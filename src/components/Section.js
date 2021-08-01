export class Section {
    constructor({ renderer }, cardContainer) {
        this._renderer = renderer;
        this._cardContainer = document.querySelector(cardContainer);
    }
    
    //метод, который отрисовывает элементы на страницу
    createItems(data) {
      data.forEach(data => {
          this._renderer(data);
      }) 
    }
    
    //метод, который добавляет элементы в разметку
    addItem(element) {
        this._cardContainer.prepend(element)
    }
}
