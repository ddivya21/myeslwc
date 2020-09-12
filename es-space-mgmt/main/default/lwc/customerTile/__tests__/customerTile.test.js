import { createElement } from "lwc";
import CustomerTile from "c/customerTile";

const CUSTOMER_DETAILS = {
  name: "Test 1",
  email: "test1@example.com",
  city: "NY",
  state: "NY",
  status: "Open",
  Id: "0000000"
};
const SOBJECT_TYPE = "Lead";

describe("c-customer-tile", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("renders customer tile component successfully", () => {
    const element = createElement("c-customer-tile", {
      is: CustomerTile
    });
    element.object = SOBJECT_TYPE;
    element.customer = CUSTOMER_DETAILS;
    document.body.appendChild(element);

    const linkEl = element.shadowRoot.querySelector("a");
    expect(linkEl.textContent).toBe(CUSTOMER_DETAILS.name);

    const pElements = element.shadowRoot.querySelectorAll("p");
    expect(pElements.length).toBe(2);
    expect(pElements[0].textContent).toBe(`Status: ${CUSTOMER_DETAILS.status}`);
    expect(pElements[1].textContent).toBe(`Email: ${CUSTOMER_DETAILS.email}`);
  });

  it("tests the tile selection event is fired", () => {
    const SELECT_EVENT_DETAIL = {
      customerId: "0000000",
      sobjectType: "Lead",
      state: "NY"
    };

    const element = createElement("c-customer-tile", {
      is: CustomerTile
    });
    element.object = SOBJECT_TYPE;
    element.customer = CUSTOMER_DETAILS;
    document.body.appendChild(element);

    // Mock handler for child event
    const handler = jest.fn();
    element.addEventListener("customerselect", handler);

    const divElement = element.shadowRoot.querySelector("div");
    divElement.click();

    return Promise.resolve().then(() => {
      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail).toEqual(SELECT_EVENT_DETAIL);
    });
  });
});
