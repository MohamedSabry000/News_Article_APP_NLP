import "babel-polyfill";
import { postFormDataToserver } from "../src/client/js/postData";
test('Testing the postFormDataToserver() function', () => {
    expect(postFormDataToserver).toBeDefined();
});
