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
  "jquery",
  "ojs/ojarraydataprovider",
  "ojs/ojknockout",
  "ojs/ojformlayout",
  "ojs/ojinputtext",
  "ojs/ojlabel",
  "ojs/ojselectsingle",
  "ojs/ojmessages",
  "ojs/ojpopup",
  "ojs/ojnavigationlist",
  "ojs/ojdialog"
], function (accUtils, ko, axios, $, ArrayDataProvider) {
  function AboutViewModel() {
    this.name = ko.observable("");
    this.age = ko.observable("");
    this.email = ko.observable("");
    (this.mobile = ko.observable("")), (this.gender = ko.observable(""));
    this.familyMembers = ko.observable("");
    this.address = ko.observable("");
    this.symptoms = ko.observable("");
    this.regestrationId = ko.observable('');
    const genders = [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "others", label: "Others" },
    ];
    this.genderDP = new ArrayDataProvider(genders, {
      keyAttributes: "value",
    });
    this.messages = [
      {
        severity: "error",
        summary: "Error",
        detail: "Something went wrong, please try again",
        closeAffordance: "none",
        timestamp: new Date().getTime(),
      },
    ];
    this.messagesDataprovider = new ArrayDataProvider(this.messages);

    const data = [
      { name: "Regestration", id: "regestration", icons: "oj-ux-ico-add-edit-page" },
      {
        name: "Upload Prescription",
        id: "prescription",
        icons: "oj-ux-ico-upload"
      }
    ];
    this.selectedItem = ko.observable("regestration");
    this.display = ko.observable("all");
    this.edge = ko.observable("top");
    this.dataProvider = new ArrayDataProvider(data, { keyAttributes: "id" });


    this.player ;
    this.canvas ;
    this.context ;

    this.connected = () => {
      window.scrollTo(0, 0);
      accUtils.announce("Health Campiagn page loaded.", "assertive");
      document.title = "Health Campiagn";
      this.player = document.getElementById('player');
      this.canvas = document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');
    };
    this.submitForm = () => {
      const url =
        "https://aluminiapi.azurewebsites.net/api/MedicalCamp/Register";
      const body = {
        Id: 0,
        Name: this.name(),
        Age: this.age(),
        Gender: this.gender(),
        Phone: this.mobile(),
        Email: this.email(),
        NoOfFamilyMembers: this.familyMembers(),
        Adress: this.address(),
        Symptoms: this.symptoms(),
        CreatedDate: `${new Date()}`,
      };
      const headers = {
        "Content-Type": "application/json",
      };
     
      axios
        .post(url, body, JSON.stringify(headers))
        .then((resp) => {
          console.log(resp);
          if (!resp.data.isError) {
            window.open(resp.data.Data.PdfFile, "_blank");
            this.name("");
            this.age("");
            this.email("");
            this.mobile("");
            this.gender("");
            this.familyMembers("");
            this.address("");
            this.symptoms("");
            this.openDialog('error');
          } else {
            this.openDialog('error');
          }
        })
        .catch((err) => {
          this.openDialog('error');
        });
    };
    this.openDialog = (id) => {
      const dialog = document.querySelector(`#${id}`);
      dialog?.open?.();
    };
    this.closeDialog = (id) => {
      const dialog = document.querySelector(`#${id}`);
      dialog?.close?.();
    };
    this.cancelListener = () => {
      this.closeDialog('error');
    };
    this.uploadFront = (event) => {
      this.action('front');
      this.openDialog('image');
      this.cameraGetVideo();
    }
    this.uploadBack = (event) => {
      this.action('back');
      this.openDialog('image');
      this.cameraGetVideo();
    }
    this.uploadDocs = () => {
      const url =
      "https://aluminiapi.azurewebsites.net/api/MedicalCamp/UploadPrescription";
    const body = {
      Id: 0,
      RegestrationID : Number(this.regestrationId()),
      FrontImage: this.frontImage().replace('data:image/jpeg;base64,',''),
      BackImage: this.backImage().replace('data:image/jpeg;base64,',''),
      CreatedDate: `${new Date()}`,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(url, body, JSON.stringify(headers))
      .then((resp) => {
        console.log(resp);
        if (!resp.data.isError) {
          this.regestrationId('');
          this.backImage('');
          this.frontImage('');
        } else {
          this.openDialog('error');
        }
      })
      .catch((err) => {
        this.openDialog('error');
      });
    }
    this.cameraGetVideo = function () {
      this.player = document.getElementById('player');
      this.canvas = document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');

      const constraints = {
        video: { facingMode: { exact: "environment" } },
      };
      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this.player.srcObject = stream;
        });
    }
    this.cameraGetImage = () => {
      this.context.drawImage(this.player, 0, 0, this.canvas.width, this.canvas.height);
      this.player.srcObject.getVideoTracks().forEach(track => track.stop());
      this.cameraGetVideo();
    }
    this.closeCam = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.player.srcObject.getVideoTracks().forEach(track => track.stop());
    }
    this.frontImage = ko.observable('');
    this.backImage = ko.observable('');
    this.action = ko.observable('front');
    this.cameraSaveImage = () => {
      var dt = this.canvas.toDataURL('image/jpeg');
      if(this.action() === 'front'){
        this.frontImage(dt);
      } else {
        this.backImage(dt);
      }
      this.closeDialog('image');
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
});
