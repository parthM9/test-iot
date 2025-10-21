import { Address } from "../../common/cario/generated/carioTypes";

export function convertDeliveryAddressToGeocode(address: Address): string {
  const results: string[] = [];
  if (address.line1) {
    results.push(address.line1);
  }
  if (address.line2) {
    results.push(address.line2);
  }
  if (address.line3) {
    results.push(address.line3);
  }
  if (address.location.locality) {
    results.push(address.location.locality);
  }
  if (address.location.state) {
    results.push(address.location.state);
  }
  if (address.location.postcode) {
    results.push(address.location.postcode);
  }
  if (address.location.country?.name) {
    results.push(address.location.country.name);
  }
  return results.join(",");
}
