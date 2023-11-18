import { ObjectDirective } from "vue";
import type { IClickOutside } from "@/type";

interface ExtendedHTMLElement extends HTMLElement {
  clickOutsideHandler: (event: Event) => void;
}

export const clickOutsideDirective: ObjectDirective<
  ExtendedHTMLElement,
  (payload: IClickOutside) => void
> = {
  bind: (el, binding) => {
    // eslint-disable-next-line no-param-reassign
    el.clickOutsideHandler = (event: Event) => {
      const isInside = el === event.target || el.contains(event.target as HTMLElement);
      const isParent =
        el.parentNode === event.target ||
        ((el.parentNode as HTMLElement).contains(event.target as HTMLElement) && !isInside);
      const isOutside = !isInside && !isParent;

      binding.value({
        isParent,
        isInside,
        isOutside
      });
    };

    window.addEventListener("click", el.clickOutsideHandler);
  },
  unbind: (el) => {
    window.removeEventListener("click", el.clickOutsideHandler);
  }
};
