// Отрисовка элемента в DOM
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const addPopupElement = (place, component, subComponent) => {
  place.appendChild(component.getElement());
  component.getElement().appendChild(subComponent.getElement());
};

const removePopupElement = (place, component, subComponent) => {
  component.getElement().removeChild(subComponent.getElement());
  place.removeChild(component.getElement());
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {RenderPosition, createElement, render, addPopupElement, removePopupElement, remove};
