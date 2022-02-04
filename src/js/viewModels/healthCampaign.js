/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define([
  "../accUtils",
  "knockout",
  "axios",
  "ojs/ojarraydataprovider",
  "ojs/ojknockout",
  "ojs/ojformlayout",
  "ojs/ojinputtext",
  "ojs/ojlabel",
  "ojs/ojselectsingle"
], function (accUtils, ko, axios, ArrayDataProvider) {
  function AboutViewModel() {
    this.name = ko.observable("");
    this.age = ko.observable("");
    this.email = ko.observable("");
    (this.mobile = ko.observable("")), (this.gender = ko.observable(""));
    this.familyMembers = ko.observable("");
    this.address = ko.observable("");
    this.symptoms = ko.observable("");
    const genders = [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "others", label: "Others" },
    ];
    this.genderDP = new ArrayDataProvider(genders, {
      keyAttributes: "value",
    });
    this.connected = () => {
      window.scrollTo(0, 0);
      accUtils.announce("About page loaded.", "assertive");
      document.title = "About";
      // Implement further logic if needed
    };
    this.submitForm = () => {
      const url =
        "https://aluminiapi.azurewebsites.net/api/MedicalCamp/Register";
      const body = {
        Name: this.name(),
        Age: this.age(),
        Gender: this.gender(),
        Phone: this.mobile(),
        Email: this.email(),
        NoOfFamilyMembers: this.familyMembers(),
        Adress: this.address(),
        Symptoms: this.symptoms(),
      };
      const headers = {
        "Content-Type": "application/json"
      }
      axios
        .post(url, JSON.stringify(body),headers)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    this.disconnected = () => {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    this.transitionCompleted = () => {
      // Implement if needed
    };
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return AboutViewModel;
});
