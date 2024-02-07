import { PolymerElement, html } from "@polymer/polymer";
import '@polymer/app-route/app-route.js'
import '@polymer/app-route/app-location.js'
import "@polymer/iron-ajax/iron-ajax.js"
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js'
import { MyApp } from "./my-app";
class ViewAccountDetails extends MyApp {
    static get template() {
        return html`

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
       <style>
       .container{
             margin-top:100px;
             width:100%;
        }
       .inline-block {
        margin-top:100px;
        display: inline-block;
        margin-left:200px;
        }
        #btn{
        margin-top:90px;
        margin-left:900px;
        float:right;
        margin-right:100px;
        }
        @media only screen and (max-width: 500px) {
           
           td,th{
            font-size:8px;
           }
           .inline-block {
            margin-left:25%;
            text-align:center;
            width:50%;
            height:100px;
            
            }
          }
       </style>
      
    <app-location route="{{route}}"></app-location>
    <app-route
    route="{{route}}"
    pattern="/page:"
    data="{{routeData}}">
    </app-route>
    <iron-ajax url="src/validationMessage.json" last-response="{{validationmsg}}" auto></iron-ajax>
       <div id="acNoDiv" class="inline-block">
            <label><b>{{localize("accountNumber_label")}}</b></label>
            <br>
            <small>{{accountNumber}}</small>
       </div>
       <div id="holderDiv" class="inline-block">
            <label><b>{{localize("accountHolder")}}</b></label>
            <br>
            <small>{{accountHolder}}</small>
       </div>
       <div class="inline-block">
            <label><b>{{localize("dateRange")}}</b></label>
            <br>
            <small>{{fromDateRange}} - {{toDateRange}}</small>
       </div>
      
       <div class="container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Account Number</th>
                        <th>Account holder</th>
                        <th>Frommonth</th>
                        <th>Fromyear</th>
                        <th>Tomonth</th>
                        <th>Toyear</th>
                        <th>View Type</th>
                    </tr>
                </thead>
               
                <template is="dom-repeat" items="{{accountDetails}}">
                    <tr>
                        <td>{{item.accountNumber}}</td>
                        <td>{{item.accountHolder}}</td>
                        <td>{{item.fromMonth}}</td>
                        <td>{{item.fromYear}}</td>
                        <td>{{item.toMonth}}</td>
                        <td>{{item.toYear}}</td>
                        <td>{{item.viewType}}</td>
                    </tr>
                </template> 
       
            </table>
        </div>
        <div id="btn">
        <button class="btn btn-secondary" on-click="goBack">Back</button>
        </div>
       `

    }
    static get properties() {
        return {
            data: {
                type: Object,
                notify: true,
                observer: 'observeChanged'
            },
            formData: {
                type: Object,
                notify: true,

            },
            accountNumber: {
                type: Number
            },
            accountHolder: {
                type: String
            },
            fromDateRange: {
                type: String
            },
            toDateRange: {
                type: String
            },
            accountDetails: {
                type: Array,
                value:[]
            },
            commonValues:{
                type:Object,
                value:{}
            },
            // newLanguage:{
            //     type:String,
            //     notify: true,
            //     observer: 'newlanguageObserver'
            // }
        //    language:{
        //     type:String
        //    }
        }
    }
    connectedCallback(){
        super.connectedCallback()
        //console.log("language ",this.language)
        // this.commonValues = localStorage
        // console.log(this.commonValues.viewType)
    }
    // newlanguageObserver(newLanguage){
    //     console.log("inside observer")
    //     this.language = language
    // }
    observeChanged(data) {

        this.formData = data;
        const splitArray = this.formData.AccountNumber.split("-")
        this.accountNumber = splitArray[0].trim()
        this.accountHolder = splitArray[1].trim()
        const threeLetterFromMonth = this.formData.fromMonth.substring(0, 3)
        this.fromDateRange = threeLetterFromMonth + " " + this.formData.fromYear
        const threeLetterToMonth = this.formData.toMonth.substring(0, 3)
        this.toDateRange = threeLetterToMonth + " " + this.formData.toYear
        this.accountDetails = [
            { accountNumber: 758475385793, accountHolder: "Priya", fromMonth: "February", fromYear: 2024, toMonth: "February", toYear: 2023, viewType: "ledger" },
            { accountNumber: 758475385793, accountHolder: "Priya", fromMonth: "February", fromYear: 2024, toMonth: "February", toYear: 2024, viewType: "ledger" },
            { accountNumber: 758475385793, accountHolder: "Priya", fromMonth: "February", fromYear: 2024, toMonth: "February", toYear: 2023, viewType: "ledger" },
            { accountNumber: 758475385793, accountHolder: "Priya", fromMonth: "February", fromYear: 2024, toMonth: "February", toYear: 2023, viewType: "ledger" },
            { accountNumber: 758475385793, accountHolder: "Priya", fromMonth: "February", fromYear: 2024, toMonth: "February", toYear: 2023, viewType: "ledger" },
            { accountNumber: this.accountNumber, accountHolder: this.accountHolder, fromMonth: this.formData.fromMonth, fromYear: this.formData.fromYear, toMonth: this.formData.toMonth, toYear: this.formData.toYear, viewType: this.formData.viewType }
        ]
    
        
    }
    goBack() {
        this.set("route.path", "accountDetails")
    }

}
customElements.define("view-account-details", ViewAccountDetails)