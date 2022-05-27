import { isPropertyAssignment } from "typescript";

describe('Website', () => {
    it('should be alive', () => {
        browser.url(`/`)
        const img = $('img[src="https://static.litecart.net/storage/images/logotype_light.svg"]')
        if (!img.isExisting) {
            throw new Error('Website should be opened with displayed logo');
        }
   });     
});
