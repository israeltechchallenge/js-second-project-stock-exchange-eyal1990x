const imgUrl = []
const urlData = []
const companyImg = []
const changesInPercentage = []

class ResultList {
    constructor(){
        this.imgUrl =imgUrl
        this.urlData = urlData 
    }

    getImgUrl = async () =>{
        for (let i = 0; i < companySymbol.length; i++) {
            imgUrl[i] = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol[i]}`
            const response = await fetch(imgUrl[i]);
            const data = await response.json();
            urlData[i] = (data.profile)
            companyImg[i] = (urlData[i].image) 
    }
    this.urlData = urlData
    this.imgUrl =imgUrl 
    // console.log(imgUrl);
    console.log(urlData);
    // console.log(companyImg);
    }

    displayImgAndPercentageChanges  = async () => {
        let displayImg =[]
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

            displayImg[i] = (`${companyName[i]} (${companySymbol[i]})`);
            let link = document.createElement('a');
            let linkText = document.createTextNode(`${displayImg[i]}`);
            link.appendChild(linkText)
            link.title = (`${displayImg[i]}`);
            link.href = (`company.html?symbol=${companySymbol[i]}`)
            link.classList.add('companyAndSymbol');
            link.innerHTML = (`${displayImg[i]} <br />`)
            changPercentage.innerHTML = (`Stock price change in percentage ${changPercentage[i]}%`)
            document.querySelector('.dataResult').appendChild(link);
            document.querySelector('.dataResult').appendChild(changPercentage);
        }
    }


    removeLoader = () => {
        loader.classList.remove('active');
    }
}

const newResultList = async () => {
    const resultList = new ResultList()
    await resultList.getImgUrl()
    await resultList.displayImgAndPercentageChanges()
    resultList.removeLoader()
}


