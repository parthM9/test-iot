import { fixCosmosId } from "../utils";

describe("utils tests", () => {
  it("test id maps", () => {
    const id = "6_hzX8IkWDOMh0MoyIYf6x/eL3QtepxAk1+SLTimJTY=";
    expect(fixCosmosId(id)).toEqual("6_hzX8IkWDOMh0MoyIYf6x_eL3QtepxAk1+SLTimJTY=");
  });

  it("multiple illegal chars are replaced", () => {
    const id = "6_hzX8IkW/OMh0MoyIYf6x/eL3Qtepx?k1+SLTim/TY=";
    expect(fixCosmosId(id)).toEqual("6_hzX8IkW_OMh0MoyIYf6x_eL3Qtepx--k1+SLTim_TY=");
  });
});
