import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const clocker = async () => {
  const driver = await new Builder().forBrowser('chrome')
    .setChromeOptions(
      new chrome.Options().headless().windowSize({width: 100, height: 60})
    )
    .build();
  console.log(driver);

  try {
    await driver.get('https://www.cnc-claimsource.com');
    await driver.findElement(By.id("username")).sendKeys('johnk');
    console.log('i did it');
  } catch (e) {
    console.log('from catch', e);
  } finally {
    await driver.quit();
  }
}

export default clocker;