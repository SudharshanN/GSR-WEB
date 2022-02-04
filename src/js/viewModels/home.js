/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your home ViewModel code goes here
 */
define(['../accUtils', 'appController', 'knockout', 'ojs/ojcontext', 'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojpagingcontrol', 'ojs/ojavatar', 'ojs/ojdialog'],
 function(accUtils, _app, ko, Context) {
    function HomeViewModel() {
      var that = this;
      that.pagingModel = ko.observable(null);
      that.app = _app;
      that.chemicals = [
            { name: 'Laying the foundation for a better tomorrow', link: 'about' },
            { name: 'Change Starts with You', link: 'joinus' },
            { name: 'Singular focus on the welfare of the nation ', link: 'focus' }];
      that.openVideo = () => {
        document.querySelector("#dialog1").open();
      }
      that.closeVideo = () => {
        document.querySelector("#videoContainer").pause();
        document.querySelector("#dialog1").close();
      }
      that.connected = () => {
        window.scrollTo(0,0);
        accUtils.announce('Home page loaded.', 'assertive');
        document.title = "Home";
        var filmStrip = document.getElementById('filmStrip');
          var busyContext = Context.getContext(filmStrip).getBusyContext();
          busyContext.whenReady().then(function () {
            that.pagingModel(filmStrip.getPagingModel());
        });
        // Implement further logic if needed
      };
      that.getItemInitialDisplay = function(index)
      {
        return index < 1 ? '' : 'none';
      };
      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      that.disconnected = () => {
        // Implement if needed
        
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      that.transitionCompleted = () => {
        
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return HomeViewModel;
  }
);
