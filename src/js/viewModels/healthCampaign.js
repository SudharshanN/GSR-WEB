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
define(['../accUtils', 'knockout', 'ojs/ojknockout', 'ojs/ojformlayout', 'ojs/ojinputtext', 'ojs/ojlabel'],
 function(accUtils, ko) {
    function AboutViewModel() {
      this.name = ko.observable('');
      this.age=ko.observable('')
      this.email = ko.observable('');
      this.mobile = ko.observable(''),
      this.gender = ko.observable('');
      this.familyMembers = ko.observable('');
      this.address = ko.observable('');
      this.symptoms = ko.observable('');
      this.connected = () => {
        window.scrollTo(0,0);
        accUtils.announce('About page loaded.', 'assertive');
        document.title = "About";
        // Implement further logic if needed
      };
      this.submitForm = () => {
        console.log('hi');
      }
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
  }
);
