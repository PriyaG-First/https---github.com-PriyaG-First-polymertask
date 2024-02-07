import { PolymerElement, html } from "@polymer/polymer";
import '@polymer/paper-toggle-button/paper-toggle-button.js'
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";
import { AppLocalizeBehavior } from "@polymer/app-localize-behavior"
export class MyApp extends mixinBehaviors([AppLocalizeBehavior],PolymerElement) {
    static get template() {
        return html
            `
        <my-header></my-header>
       
        <app-location route="{{route}}"></app-location>
    <app-route
    route="{{route}}"
    pattern="/:page"
    data="{{routeData}}">
    </app-route>
    
    <iron-pages selected="[[routeData.page]]" attr-for-selected="name">
        <account-details name="accountDetails" on-custom-submit="getData" on-custom-language="setLanguage"></account-details>
        <view-account-details name="viewAccountDetails" data="{{value}}" language="{{language}}"></view-account-details>
    </iron-pages>
   
        `
    }
    static get properties() {
        return {
            // data: {
            //     type: Object,
            //     //notify: true,
            //     observer: 'getData'
            // },
            value: {
                type: Object
            },
            propertiesData: {
                type: Object,
                value: function () {
                    return new Map();
                }
            },
              
            language:{
                type:String,
                value:'en'
            }
            
        }
    }
    connectedCallback() {
        super.connectedCallback()
        this.loadResources(this.resolveUrl('locales.json'));
        // this.addEventListener('localize-resources-loaded', () => {
        //     console.log("this ", this.localize("viewType"));
        // });
        //this.fetchData()
    }
    setLanguage(event){
        console.log("event caledd ",event.detail)
       this.language = event.detail
       console.log("after event called ",this.language)
    } 
    fetchData() {
        
        let resource;
        if(navigator.language == 'en-US'){
             resource = 'locales/common.properties'
        }
        else if(navigator.language == 'fr'){
            resource = 'locales/common_fr.properties'
        }
        else if(navigator.language == 'ta'){
            resource = 'locales/ta.properties'
        }
        let xhr = new XMLHttpRequest();
        let propertyArray = [];
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    const splitArray = xhr.responseText.split('\n')
                    for (let i = 0; i < splitArray.length; i++) {
                        propertyArray[i] = splitArray[i].split("=")
                    }
                   
                    if (propertyArray.length > 0) {
                        this.setData(propertyArray)
                    }
                }
            }
        };
        xhr.open("GET", resource, true);
        xhr.send();
    }
    setData(propertiesArray) {
        for (const propertyArray of propertiesArray) {
           // localStorage.setItem("exprirationTime",new Date())
          //  localStorage.setItem(`${propertyArray[0]}`.trim(), `${propertyArray[1]}`.trim())
            //this.set(`propertiesData.${propertyArray[0]}`.trim(), `${propertyArray[1]}`.trim())
            //sessionStorage.setItem("msg1",JSON.stringify(this.propertiesData))
           // localStorage.setItem("propertiesObj",JSON.stringify(this.propertiesData))  
         
        }
        localStorage.clear()
        //const obj = JSON.parse(localStorage.msg)
   

    }
    
    // attached() {
    //     this.loadResources(this.resolveUrl('src/common.properties'));
       
    //   }

    getData(event) {
        this.value = event.detail
        
    }
    static get observers() {
        return [
            '_routePageChanged(routeData.page)'
        ];
    }
    _routePageChanged(page) {
        if (page == "components") {
            this.set("routeData.page", "accountDetails")
        }
    }
}
customElements.define("my-app", MyApp)