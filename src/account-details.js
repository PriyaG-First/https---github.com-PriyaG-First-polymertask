import { PolymerElement, html } from "@polymer/polymer";
import { DomIf as DomIf } from "@polymer/polymer/lib/elements/dom-if";
import { DomRepeat as DomRepeat } from "@polymer/polymer/lib/elements/dom-repeat";
import '@polymer/app-route/app-route.js'
import '@polymer/app-route/app-location.js'
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js'
import '@polymer/paper-listbox/paper-listbox.js'
import '@polymer/paper-item/paper-item.js'
import '@polymer/paper-radio-button/paper-radio-button.js'
import '@polymer/paper-radio-group/paper-radio-group.js'
import '@polymer/paper-button/paper-button.js'
import './view-account-details.js'
import "@polymer/iron-list/iron-list.js"
import "@lrnwebcomponents/iron-data-table/iron-data-table.js"
import { } from '@polymer/polymer/lib/elements/dom-bind.js';
import "@polymer/iron-ajax/iron-ajax.js"
import "@lrnwebcomponents/iron-data-table/lib/data-table-column.js"
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";
import { AppLocalizeBehavior } from "@polymer/app-localize-behavior";
import { MyApp } from "./my-app.js";

class AccountDetails extends MyApp {
    static get properties() {
        return {
            accountNumber: {
                type: String
            },
            showTemplate: {
                type: Boolean,
                value: false
            },
            yearDropdown: {
                type: Array
            },
            errorMessageForAcNo: {
                type: String
            },
            errorMessageForViewType: {
                type: String
            },
            isSelectedViewType: {
                type: Boolean
            },
            selectedValue: {
                type: String
            },
            isSelectedACNo: {
                type: Boolean,
                value: false
            },
            fromMonth: {
                type: String,
            },
            fromYear: {
                type: Number,
            },
            toMonth: {
                type: String,
            },
            toYear: {
                type: Number,

            },
            dateField: {
                type: Boolean,
            },
            dateError: {
                type: String,
            },
            monthMap: {
                type: Object,
                value: {
                    January: 0,
                    February: 1,
                    March: 2,
                    April: 3,
                    May: 4,
                    June: 5,
                    July: 6,
                    August: 7,
                    September: 8,
                    October: 9,
                    November: 10,
                    December: 11,
                }
            },
            months: {
                type: Array,
                value: [
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                ]
            },
            isDateValid: {
                type: Boolean
            },
            DateValidationError: {
                type: String
            },
            userData: {
                type: Array,
                value: [{ name: "priya", empid: 3231, dateOfBirth: "23-09-1999" },
                { name: "priya", empid: 3231, dateOfBirth: "23-09-1999" },
                { name: "priya", empid: 3231, dateOfBirth: "23-09-1999" },
                { name: "priya", empid: 3231, dateOfBirth: "23-09-1999" },
                { name: "priya", empid: 3231, dateOfBirth: "23-09-1999" }]
            },
            validationmsg: {
                type: Object
            },
            commonValues:{
                type:Object,
                value:{}
            },
            language: {
                type:String,
                value: 'en'
              },
        }
    }
    static get template() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
    small{
        color:red;
    }
    #acNo{
        margin-top:85px;
       
    }
   
    .container{
        margin-top:65px;
    }
    #btnDiv{
        margin-left:700px;
        margin-top:50px;
        
    }
    #dateField{
        margin-top:35px;
        min-height: 150px;
    
    }
    @media only screen and (max-width: 500px) {
        #btnDiv{
            margin-left:80px; 
        }
        paper-dropdown-menu{
            width:100%;
        }
       
      }
    </style>
   
    <paper-toggle-button on-change="_switchLanguage">Language: {{language}}</paper-toggle-button>
  <iron-ajax url="src/validationMessage.json" last-response="{{validationmsg}}" auto></iron-ajax>
    <app-location route="{{route}}"></app-location>
    <app-route
    route="{{route}}"
    pattern="/:"
    data="{{routeData}}">
    </app-route>
            <form>
                <div class="container" id="acNo">
                    <paper-dropdown-menu label="Account number">
                        <paper-listbox slot="dropdown-content" selected ="{{accountNumber}}" attr-for-selected="value">
                            <paper-item value="878948237492 - PriyaG">878948237492 - PriyaG</paper-item>
                            <paper-item value="875893475999 - Ranjith">875893475999 - Ranjith</paper-item>
                            <paper-item value="826646692834 - Tamil">826646692834 - Tamil</paper-item>
                            <paper-item value="652381878777 - Thinesh">652381878777 - Thinesh</paper-item>
                         </paper-listbox>
                    </paper-dropdown-menu>
                    <template is="dom-if" if="{{isSelectedACNo}}">
                        <small>{{errorMessageForAcNo}}</small>
                    </template>
                </div>
                <div class="container">
                    <label><b>{{localize("viewType_label")}}</b></label><br>
                    <paper-radio-group selected="{{selectedValue}}" on-iron-change="selectedViewType">
                        <paper-radio-button name="PaySlip">PaySlip</paper-radio-button>
                        <paper-radio-button name="ledger" on-click="showYearField">ledger</paper-radio-button>
                    </paper-radio-group>
                    <template is="dom-if" if="{{isSelectedViewType}}">
                        <small>{{errorMessageForViewType}}</small>
                    </template>
                </div>

                <div class="container" id="dateField">
                    <template id="yearTemp" is="dom-if" if="{{showTemplate}}">
                        <paper-dropdown-menu label="From month"  on-iron-select="selectFromMonth">
                            <paper-listbox slot="dropdown-content" selected="{{fromMonth}}" attr-for-selected="value">
                                <template is=dom-repeat items={{months}}>
                                    <paper-item value="[[item]]">{{item}}</paper-item>
                                </template>
                            </paper-listbox>
                        </paper-dropdown-menu>
                        <paper-dropdown-menu label="From year">
                            <paper-listbox slot="dropdown-content" selected="{{fromYear}}" attr-for-selected="value" >
                                <template is=dom-repeat items={{yearDropdown}}>
                                    <paper-item value="[[item]]">{{item}}</paper-item>
                                </template>
                            </paper-listbox>
                        </paper-dropdown-menu>
                        <paper-dropdown-menu label="To month" >
                            <paper-listbox slot="dropdown-content" selected="{{toMonth}}" attr-for-selected="value" >
                                <template is=dom-repeat items={{months}}>
                                    <paper-item value="[[item]]">{{item}}</paper-item>
                                </template>
                            </paper-listbox>
                        </paper-dropdown-menu>
                        <paper-dropdown-menu label="To year">
                            <paper-listbox slot="dropdown-content" selected="{{toYear}}" attr-for-selected="value">
                                <template is=dom-repeat items={{yearDropdown}}>
                                    <paper-item value="[[item]]">{{item}}</paper-item>
                                </template>
                            </paper-listbox>
                        </paper-dropdown-menu>
                        <div>
                        <div>
                            <template is="dom-if" if="{{dateField}}">
                                <small>{{dateError}}</small>
                            </template>
                        </div>
                        
                        <div>
                        <template is="dom-if" if="{{isDateValid}}">
                            <small>{{DateValidationError}}</small>
                        </template>
                    </div>
                    </div>
                    </template>    
                </div>
                <div class="container" id="btnDiv">
                    <paper-button class="btn btn-secondary" on-click="resetFields">Reset</paper-button>
                    <paper-button class="btn btn-success" type="submit" on-click="submitForm">Submit</paper-button>
                </div>
            </form>  
        `
    }
    connectedCallback() {
        super.connectedCallback();
       // console.log("language ",this.language)
        // console.log("this ",this.localize("key"))
        // console.log(this.localize('viewType'));
        this.shadowRoot.querySelector("paper-dropdown-menu").addEventListener("mouseover", this.maskAccountNo)
       // this.commonValues = localStorage
    //     let exp = JSON.parse(localStorage.getItem("expiresKey"))
    //     console.log("current time in millisec ",new Date().getTime())
    //     console.log("stored expire time ",exp.time)
    //     console.log("new time ",new Date().getTime() - exp.time)
     }
    
   
    selectedViewType(event) {
        if (event.target.name == "PaySlip") {
            this.showTemplate = false;
        }
        this.isSelectedViewType = false
    }
    _switchLanguage() {
        this.language = this.language === 'fr' ? 'en' : 'fr';
        this.dispatchEvent(new CustomEvent("custom-language", { detail:  this.language}))
        console.log("language ",this.language)

      //  localStorage.setItem("language",this.language)

      }
    resetFields() {
        this.fromMonth = null
        this.fromYear = null
        this.toMonth = null
        this.toYear = null
        this.accountNumber = null
        this.selectedValue = ''
        this.dateField = false
        this.isSelectedACNo = false
        this.isDateValid = false;
        this.isSelectedViewType = false
    }
    maskAccountNo(event) {
        const paperItemEle = event.target.querySelectorAll("paper-item")
        let maskedAccountNumber = "";
        let accArray = [];
        let count = 0;
        for (let i = 0; i < paperItemEle.length; i++) {
            if (paperItemEle[i].textContent != "") {
                count++
                if (count > 0) {
                    maskedAccountNumber = ""
                }
                const accountNo = paperItemEle[i].textContent.substring(0, 8);
                for (let s = 0; s < accountNo.length; s++) {
                    accArray[s] = accountNo.charAt(s);
                    maskedAccountNumber = maskedAccountNumber + accArray[s].replace(accArray[s], 'x');
                }
                const number = paperItemEle[i].textContent.replace(paperItemEle[i].textContent.substring(0, 8), maskedAccountNumber)
                paperItemEle[i].textContent = number;

            }
        }

    }
    showYearField() {
        this.showTemplate = true
        this.dateField = false
        if (this.showTemplate = true) {
            this.dateField = false
        }
        const date = new Date();
        date.setMonth(date.getMonth() - 12);
        let yeardropDown = [date.getFullYear(), new Date().getFullYear()];
        this.yearDropdown = yeardropDown
    }
    submitForm(event) {
    console.log("Fgdf", this.localize("fromMonth"))
        event.preventDefault();
        if (this.accountNumber == null) {

            this.isSelectedACNo = true
            // this.errorMessageForAcNo = this.validationmsg.required.accountNumber
            //this.errorMessageForAcNo = this.propertiesData["accountNumber"]
           // this.errorMessageForAcNo = localStorage.accountNumber
           this.errorMessageForAcNo = this.localize("accountNumber")
        }
        else if (!this.selectedValue) {
            this.isSelectedACNo = false
            this.isSelectedViewType = true
            //this.errorMessageForViewType = this.validationmsg.required.viewType
            // this.errorMessageForViewType = this.propertiesData["viewType"]
           // this.errorMessageForViewType = localStorage.viewType
            this.errorMessageForViewType = this.localize("viewType")
        }
        else if (this.fromMonth == null) {
            this.isSelectedACNo = false
            this.dateField = true
            //this.dateError = this.validationmsg.required.fromMonth
           // this.dateError = this.propertiesData["fromMonth"]
        //    this.dateError = localStorage.fromMonth
        this.dateError = this.localize("fromMonth")
           
        }

        else if (this.fromYear == null) {
            this.isSelectedACNo = false
            this.dateField = true
            // this.dateError = this.validationmsg.required.fromYear
           // this.dateError = this.propertiesData["fromYear"]
        //    this.dateError = localStorage.fromYear
        this.dateError = this.localize("fromYear")
        }
        else if (this.toMonth == null) {
            this.isSelectedACNo = false
            this.dateField = true
            // this.dateError = this.validationmsg.required.toMonth
           // this.dateError = this.propertiesData["toMonth"]
        //    this.dateError = localStorage.toMonth
        this.dateError = this.localize("toMonth")
        }
        else if (this.toYear == null) {
            this.isSelectedACNo = false
            this.dateField = true
            // this.dateError = this.validationmsg.required.toYear
           // this.dateError = this.propertiesData["toYear"]
          // this.dateError = localStorage.toYear
          this.dateError = this.localize("toYear")
        }

        else if (this.fromMonth && this.toMonth && this.fromYear && this.toYear) {
            this.dateField = false
            const fromDate = new Date();
            fromDate.setDate(1)
            fromDate.setMonth(this.monthMap[this.fromMonth])
            fromDate.setFullYear(this.fromYear)
            const toDate = new Date();
            toDate.setDate(1)
            toDate.setMonth(this.monthMap[this.toMonth])
            toDate.setFullYear(this.toYear)

            const dateBefore12Months = new Date(toDate)
            dateBefore12Months.setMonth(dateBefore12Months.getMonth() - 11)

            if (fromDate > new Date() || toDate > new Date()) {
                this.isSelectedACNo = false
                this.isDateValid = true
                // this.DateValidationError = this.validationmsg.validation.future_date
               // this.DateValidationError = this.propertiesData["futureDate"]
               // this.DateValidationError = localStorage.futureDate
                this.DateValidationError = this.localize("futureDate")
            }
            else if (fromDate > toDate) {
                this.isSelectedACNo = false
                this.isDateValid = true
                // this.DateValidationError = this.validationmsg.validation.fromDategreater
                //this.DateValidationError = this.propertiesData["fromDategreater"]
                //this.DateValidationError = localStorage.fromDategreater
                this.DateValidationError = this.localize("fromDategreater")
            }
            else if (!(fromDate >= dateBefore12Months && fromDate <= toDate)) {
                this.isSelectedACNo = false
                this.isDateValid = true
                // this.DateValidationError = this.validationmsg.validation.not_between_12months
                //this.DateValidationError = this.propertiesData["notBetween12months"]
                // this.DateValidationError = localStorage.notBetween12months
                this.DateValidationError = this.localize("fromDategreater")
            }
            else {
                this.isSelectedACNo = false
                this.isDateValid = false
                this.dateField = false
            }
        }

        if (this.accountNumber && this.selectedValue && this.fromMonth && this.fromYear && this.toMonth && this.toYear && (this.isDateValid == false && this.dateField == false)) {

            const dataToSend = {
                "AccountNumber": this.accountNumber,
                "viewType": this.selectedValue,
                "fromMonth": this.fromMonth,
                "fromYear": this.fromYear,
                "toMonth": this.toMonth,
                "toYear": this.toYear,
              //  "language":this.language
            }
            this.set("route.path", "/viewAccountDetails")
            this.dispatchEvent(new CustomEvent("custom-submit", { detail: dataToSend }))
        }

    }
}
customElements.define("account-details", AccountDetails)