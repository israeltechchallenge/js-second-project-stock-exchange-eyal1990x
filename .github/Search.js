const companyName =[]
const companySymbol = []
let searchValue = ''
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.searchBtn');

class Search {
    constructor(){
        this.companyData
        this.companyName
        this.companySymbol
    }
    displayLoader = () => {
        loader.classList.add('active');
    }

    getUrlCompanyData = async () =>{
        try {

            const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ`)
        const data = await response.json();
        const companyData = data
        searchValue = `${searchInput.value}`
        console.log(searchValue);
        this.companyData = companyData
        } catch (error) {
            console.log(error);
        }
        
        
    }

    getCompanyName = () =>{
        // console.log(this.companyData[1].name);
        for (let i = 0; i < this.companyData.length; i++){
             companyName[i] = this.companyData[i].name
        }
        
        this.companyName = companyName
    }

    getCompanySymbol = () =>{
        for (let i = 0; i < this.companyData.length; i++){
            companySymbol[i] = this.companyData[i].symbol
       }
       
       this.companySymbol = companySymbol
    //    console.log(companySymbol);
   }
   
    }



    removeLoader = () => {
        loader.classList.remove('active');
    }


const newSearch = async() =>{
    const search = new Search()
    search.displayLoader()
    await search.getUrlCompanyData()
    search.getCompanyName()
    search.getCompanySymbol()
}