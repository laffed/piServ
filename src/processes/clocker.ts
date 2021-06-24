import {Builder, By, WebElement} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import ENV from '../config';

type PromiseObj = {success: boolean, status: 'in' | 'out' | 'err'};

const clocker = async (method: 'check' | 'clock'): Promise<PromiseObj> => {
  let res: PromiseObj = {success: false, status: 'err'};

  const driver = await new Builder().forBrowser('chrome')
    .setChromeOptions(
      new chrome.Options().headless().windowSize({width: 100, height: 60})
    )
    .build();

  await driver.get('https://www.cnc-claimsource.com');

  const element_exists = async (val: string, type: 'id' | 'inner'): Promise<boolean> => {
    try {
      switch (type) {
        case 'id': {
          const id = await driver.findElements(By.id(val));
          return (id.length > 0);
        }
        case 'inner': {
          const inner = await driver.findElements(By.linkText(val));
          return (inner.length > 0);
        }
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  const get_status = async (): Promise<PromiseObj> => {
    try {
      let success = false;
      let status: 'out' | 'in' | 'err' = 'err';

      if (await element_exists('clockin', 'id')) {
        success = true;
        status = 'out';
      } else if (await element_exists('clockout', 'id')) {
        success = true;
        status = 'in';
      }

      return {success, status};

    } catch (e) {
      console.log(e);
      return {success: false, status: 'err'};
    }
  }

  const do_clock_event = async (): Promise<PromiseObj> => {
    try {
      let button: WebElement | false = false;
      let status: 'in' | 'out' | 'err' = 'err';
      if (await element_exists('clockin', 'id')) {
        button = await driver.findElement(By.id('clockin'));
        status = 'in';
      } else if (await element_exists('clockout', 'id')) {
        button = await driver.findElement(By.id('clockout'));
        status = 'out';
      }
      console.log(button);

      if (button !== false) {
        await button.click();
        //send confirmation
        return {success: true, status};
      }

      return {success: false, status}

    } catch (e) {
      console.log(e);
      return {success: false, status: 'err'};
    }
  }

  // Start of main calls
  const timeClockTxt = 'Click here to access the time clock';
  if (await element_exists('username', 'id')) {
    await driver.findElement(By.id('username')).sendKeys(ENV.cncUsr);
    await driver.findElement(By.id('password')).sendKeys(ENV.cncPw);
    await driver.findElement(By.id('loginBtn')).click();

    if (!(await element_exists(timeClockTxt, 'inner'))) {
      await driver.quit();
      return {success: false, status: 'err'};
    }

    await driver.findElement(By.linkText(timeClockTxt)).click();

    if (method === 'check') {
      res = await get_status();
    } else if (method === 'clock') {
      res = await do_clock_event();
    }

  } else {
    res.success = false;
    res.status = 'err';
  }
  await driver.quit();
  return res;
}

export default clocker;
