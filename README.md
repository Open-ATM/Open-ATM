# Open ATM

Open ATM is a free and open source Do-It-Yourself ATM on Tron allowing anyone to exchange their old fiat coins for shiny new TRX. The goal is for anyone to be able to build one just like that at home.

![](https://openatm.io/ogimage.png)

## Demo Video
https://youtu.be/v8C6sItm8Zw

## What you need

- A coin acceptor with a USB wafer, usually [available for $20 on Amazon](https://www.amazon.com/s?k=coin+acceptor)

- A windows or linux tactile tablet with a built-in camera (for scanning QR codes)

- A box to attach the tablet and coin acceptor to. It will also store the physical coins until you fetch them. Any box big enough will do but if you want it to look a little more professional like mine, you can 3D print a custom box. You will find [here](https://openatm.io/box.stl) the STL file of the box I created on SketchUp to perfectly fit my tablet and Coin Acceptor. I then used [Shapeways](https://www.shapeways.com/), a 3D printing service, to print it for me.

Here is the model:
![](https://openatm.io/model.png)

And the printed result:
![](https://openatm.io/print.png)

Here are all the pieces:
![](https://openatm.io/whatyouneed.png)

Here is the final ATM:
![](https://openatm.io/result.png)

## Setup the code
On the tablet, copy and run the code that reads the input from the coin acceptor:
```
git clone https://github.com/Open-ATM/Open-ATM.git
cd Open-ATM/api
sudo apt-get install build-essential libudev-dev
yarn install
yarn start
```

Then run the frontend :
```
cd Open-ATM/frontend
yarn install
yarn run
```

Then open `localhost:3000` to start the ATM. It's now ready for use!

## User experience

First, insert some coins into the ATM. The screen will display your balance in fiat along with its value in TRX at the current exchange rate. The ATM connects to the CoinMarketCap API to get the rates in real-time.

On the next screen, the ATM asks where to send your TRX. You can choose your own wallet or one of the compatible charities' wallets, e.g. Red Cross or Unicef. This allows for easy and quick donations!

If you choose your wallet, the next screen activates the table's camera to read the QR code representing your public address. You will need a Tron wallet on your smartphone such as `TronLink` or `Trust Wallet`. Open the wallet then display your public address and scan your QR code.

The next screen is a confirmation of your amount and address. Clicking `confirm` triggers the transaction on Tron. A few seconds later, you should see your TRX in your wallet!

![](https://openatm.io/screens.png)

## Conclusion

This ATM obviously isn't very secure and could easily be broken into, so only place it at your home or at work to impress your friends and colleagues. 

Finally, the code is free and open source so don't hesitate to contribute to it or let me know what could be improved!