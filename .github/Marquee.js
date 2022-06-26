// const marqueeInput = document.getElementById('search');
const marqueeBtn = document.querySelector('.searchBtn');
const displaySymbol = []
const displayPrice = []
const urlPrice = []
const price = []

// class Marquee{
//     constructor(){
//         this.getCreateAndAppend()

//     }
//     getCreateAndAppend = async() =>{

//     for (let i = 0; i < 10; i++) {
//         urlPrice[i] = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote-short/${resultSymbol[i]}`

//         const response = await fetch(urlPrice[i]);
//         const data = await response.json();
//         console.log(data);
//         price[i] = (data[0].price);

//         console.log('create');
//         const stockSymbolAndPrice = document.createElement('p')
//         stockSymbolAndPrice.classList.add('marqueeClass')
//         this.stockSymbolAndPrice = stockSymbolAndPrice;
//         displayMarquee[i] = `${resultSymbol[i]} ${price[i]}`
//         stockSymbolAndPrice.innerHTML = `${displayMarquee[i]}`
//         document.querySelector('.marquee').appendChild(stockSymbolAndPrice)
//     } 

//     }

// }
class Marquee {
    constructor() {
        this.price
         
    }
    getPrice = async () => {
        // console.log(resultSymbol);
        try {
            for (let i = 0; i < 10; i++) {
                urlPrice[i] = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote-short/${companySymbol[i]}`
                // console.log(urlPrice[i]);
    
                const response = await fetch(urlPrice[i]);
                const data = await response.json();
                // console.log(data);
                price[i] = (data[0].price);
    
            }
            this.price = price
        } catch (error) {
            console.log(error)
        }
        

    }
    createAndDisplay = () => {
        for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 10; i++) {
            // console.log('create');
            const stockSymbolAndPrice =document.createElement('div') 
            stockSymbolAndPrice.classList.add('marqueeData')
            const stockSymbol = document.createElement('p')
            stockSymbol.classList.add('stockSymbol')
            this.stockSymbol = stockSymbol;
            const priceList = document.createElement('p')
            priceList.classList.add('priceGreen')
            this.priceList = priceList;
            stockSymbol.innerHTML = `${companySymbol[i]}`  
            priceList.innerHTML =`${price[i]}` 
            document.querySelector('.marquee').appendChild(stockSymbolAndPrice) 
            document.querySelector('.marqueeData').appendChild(stockSymbol)
            document.querySelector('.marqueeData').appendChild(priceList)
        }
        
    }
    }
}
const handleClick = async()=>{
  
//   await search() 
try {
    await newSearch()
  await newMarquee() 
  await newResultList()
} catch (error) {
    console.log(error);
}
  
}

    const newMarquee = async() => {
        const marquee = new Marquee()
        await marquee.getPrice()
        marquee.createAndDisplay()
    }
    marqueeBtn.addEventListener('click',handleClick );
    // searchBtn.addEventListener('click', search);



