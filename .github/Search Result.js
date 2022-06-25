const imgUrl = []
const urlData = []
const companyImg = []
const changesInPercentage = []
let displayImg =[]
class ResultList {
    constructor(){
        this.imgUrl =imgUrl
        this.urlData = urlData 
    }

    getImgUrl = async () =>{
        try {
            for (let i = 0; i < companySymbol.length; i++) {
                imgUrl[i] = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol[i]}`
                const response = await fetch(imgUrl[i]);
                const data = await response.json();
                urlData[i] = (data.profile)
                companyImg[i] = (urlData[i].image) 
        }
        this.urlData = urlData
        this.imgUrl =imgUrl 
        } catch (error) {
            console.log(error);
        }
      
    // console.log(imgUrl);
    // console.log(urlData);
    // console.log(companyImg);
    }

    displayImgAndPercentageChanges  = async () => {
        let displayImg =[]
        try {
            for (let i = 0; i < companyImg.length; i++) {
                let img = document.createElement('img');
                img.src = companyImg[i]
                img.classList.add('companyImg')
                document.querySelector('.dataResult').appendChild(img)
        
                changesInPercentage[i] = urlData[i].changesPercentage
                let changPercentage = document.createElement('p');
                changPercentage[i] = changesInPercentage[i]
                if (changPercentage[i] > 0) {
                    changPercentage.classList.add('greenPrecentage')
                }
                else {
                    changPercentage.classList.add('redPrecentage')
                }
    
                // displayImg[i] = ();
                let link = document.createElement('a');
                let linkText = document.createTextNode(`${companyName[i]} (${companySymbol[i]})`);
                link.appendChild(linkText)
                link.title = (`${companyName[i]} (${companySymbol[i]})`);
                link.href = (`company.html?symbol=${companySymbol[i]}`)
                link.classList.add('companyAndSymbol');
                link.innerHTML = (`${companyName[i]} (${companySymbol[i]})`)
                changPercentage.innerHTML = (`Stock price change in percentage ${changPercentage[i]}%`)
                document.querySelector('.dataResult').appendChild(link);
                document.querySelector('.dataResult').appendChild(changPercentage);
            }
        } catch (error) {
            console.log(error);
        }
       
    }

    highlight = () =>{
        let searchText = document.querySelectorAll('.companyAndSymbol')
        let allText = []
        let text = []
        let symbol = []
        searchText.forEach(element => {
            
            if(element.innerHTML.toUpperCase == searchValue.toUpperCase){
                 allText.push(element.innerHTML)

            }
        });
        
        
    }

    removeLoader = () => {
        loader.classList.remove('active');
    }
}

const newResultList = async () => {
    const resultList = new ResultList()
    await resultList.getImgUrl()
    await resultList.displayImgAndPercentageChanges()
    // resultList.highlight()
    resultList.removeLoader()
}


