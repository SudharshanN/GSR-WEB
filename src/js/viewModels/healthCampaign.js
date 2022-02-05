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
  "ojs/ojdialog",
  "ojs/ojinputnumber",
], function (accUtils, ko, axios, $, ArrayDataProvider) {
  function AboutViewModel() {
    this.name = ko.observable("");
    this.age = ko.observable();
    this.email = ko.observable("");
    this.mobile = ko.observable("");
    this.gender = ko.observable("");
    this.familyMembers = ko.observable();
    this.address = ko.observable("");
    this.symptoms = ko.observable("");

    this.rawName = ko.observable("");
    this.rawAge = ko.observable("");
    this.rawMobile = ko.observable("");
    this.rawFamilyMembers = ko.observable("");
    this.rawAddress = ko.observable("");
    this.rawSymptoms = ko.observable("");

    this.regestrationId = ko.observable("");
    this.rawRegestrationId = ko.observable("");
    const genders = [
      { value: "", label: "Select Gender" },
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Others", label: "Others" },
    ];
    this.genderDP = new ArrayDataProvider(genders, {
      keyAttributes: "value",
    });
    this.disabledUpload = ko.pureComputed(function () {
      if (
        this.rawRegestrationId().trim().length === 0 ||
        this.frontImage().trim().length === 0
      ) {
        return true;
      }
      return false;
    }, this);
    this.disabled = ko.pureComputed(function () {
      if (
        this.rawName().trim().length === 0 ||
        this.rawAge().trim().length === 0 ||
        this.rawMobile().trim().length === 0 ||
        this.gender().trim().length === 0 ||
        this.rawAddress().trim().length === 0 ||
        this.rawFamilyMembers().trim().length === 0 ||
        this.rawSymptoms().trim().length === 0
      ) {
        return true;
      }
      return false;
    }, this);

    this.messages = [
      {
        severity: "error",
        summary: "Error",
        detail: "Something went wrong, please try again",
        closeAffordance: "none",
        timestamp: new Date().getTime(),
      },
    ];
    this.messagesDataprovider = ko.observable(
      new ArrayDataProvider(this.messages)
    );

    const data = [
      {
        name: "Regestration",
        id: "regestration",
        icons: "oj-ux-ico-add-edit-page",
      },
      {
        name: "Upload Prescription",
        id: "prescription",
        icons: "oj-ux-ico-upload",
      },
    ];
    this.selectedItem = ko.observable("regestration");
    this.display = ko.observable("all");
    this.edge = ko.observable("top");
    this.dataProvider = new ArrayDataProvider(data, { keyAttributes: "id" });

    this.player;
    this.canvas;
    this.context;

    this.connected = () => {
      window.scrollTo(0, 0);
      accUtils.announce("Health Campiagn page loaded.", "assertive");
      document.title = "Health Campiagn";
      this.player = document.getElementById("player");
      this.canvas = document.getElementById("canvas");
      this.context = this.canvas.getContext("2d");
    };
    this.checkNumbers = () => {
      if (!Number(this.age())) {
        const messages = [
          {
            severity: "error",
            summary: "Error",
            detail: "Please enter only numbers in Age field",
            closeAffordance: "none",
            timestamp: new Date().getTime(),
          },
        ];
        this.messagesDataprovider(new ArrayDataProvider(messages));
        this.openDialog("error");
        return false;
      } else if (!Number(this.mobile())) {
        const messages = [
          {
            severity: "error",
            summary: "Error",
            detail: "Please enter only numbers in Mobile Number field",
            closeAffordance: "none",
            timestamp: new Date().getTime(),
          },
        ];
        this.messagesDataprovider(new ArrayDataProvider(messages));
        this.openDialog("error");
        return false;
      } else if (!Number(this.familyMembers())) {
        const messages = [
          {
            severity: "error",
            summary: "Error",
            detail:
              "Please enter only numbers in Number of family members field",
            closeAffordance: "none",
            timestamp: new Date().getTime(),
          },
        ];
        this.messagesDataprovider(new ArrayDataProvider(messages));
        this.openDialog("error");
        return false;
      } else {
        return true;
      }
    };
    this.submitForm = () => {
      if (this.checkNumbers()) {
        this.openDialog("loading-popup");
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
            if (!resp.data.IsError) {
              window.open(resp.data.Data.PdfFile, "_blank");
              this.name("");
              this.age("");
              this.email("");
              this.mobile("");
              this.gender("");
              this.familyMembers("");
              this.address("");
              this.symptoms("");
              this.rawName("");
              this.rawAge("");
              this.rawMobile("");
              this.rawFamilyMembers("");
              this.rawAddress("");
              this.rawSymptoms("");
              this.closeDialog("loading-popup");
            } else {
              this.closeDialog("loading-popup");
              const messages = [
                {
                  severity: "error",
                  summary: "Error",
                  detail: "Something went wrong, please try again",
                  closeAffordance: "none",
                  timestamp: new Date().getTime(),
                },
              ];
              this.messagesDataprovider(new ArrayDataProvider(messages));
              this.openDialog("error");
            }
          })
          .catch((err) => {
            this.closeDialog("loading-popup");
            const messages = [
              {
                severity: "error",
                summary: "Error",
                detail: "Something went wrong, please try again",
                closeAffordance: "none",
                timestamp: new Date().getTime(),
              },
            ];
            this.messagesDataprovider(new ArrayDataProvider(messages));
            this.openDialog("error");
          });
      }
    };
    this.openDialog = (id) => {
      const dialog = document.querySelector(`#${id}`);
      if (dialog != undefined) {
        dialog.open();
      }
    };
    this.closeDialog = (id) => {
      const dialog = document.querySelector(`#${id}`);
      if (dialog != undefined) {
        dialog.close();
      }
    };
    this.cancelListener = () => {
      this.closeDialog("error");
    };
    this.uploadFront = (event) => {
      this.action("front");
      this.openDialog("image");
      this.cameraGetVideo();
    };
    this.uploadBack = (event) => {
      this.action("back");
      this.openDialog("image");
      this.cameraGetVideo();
    };
    this.checkNumberType = () => {
      if (!Number(this.regestrationId())) {
        const messages = [
          {
            severity: "error",
            summary: "Error",
            detail: "Please enter numbers only in Registration field",
            closeAffordance: "none",
            timestamp: new Date().getTime(),
          },
        ];
        this.messagesDataprovider(new ArrayDataProvider(messages));
        this.openDialog("error");
      } else {
        return true;
      }
    };
    this.uploadDocs = () => {
      if (this.checkNumberType()) {
        this.openDialog("loading-popup");
        const url =
          "https://aluminiapi.azurewebsites.net/api/MedicalCamp/UploadPrescription";
        const body = {
          Id: 0,
          RegistrationID: Number(this.regestrationId()),
          FrontImage: this.frontImage().replace("data:image/jpeg;base64,", ""),
          BackImage: this.backImage().replace("data:image/jpeg;base64,", ""),
          CreatedDate: `${new Date()}`,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        axios
          .post(url, body, JSON.stringify(headers))
          .then((resp) => {
            if (resp.data.IsError) {
              this.regestrationId("");
              this.backImage("");
              this.frontImage("");
              this.rawRegestrationId("");
              this.closeDialog("loading-popup");
            } else {
              this.closeDialog("loading-popup");
              const messages = [
                {
                  severity: "error",
                  summary: "Error",
                  detail: "Something went wrong, please try again",
                  closeAffordance: "none",
                  timestamp: new Date().getTime(),
                },
              ];
              this.messagesDataprovider(new ArrayDataProvider(messages));
              this.openDialog("error");
            }
          })
          .catch((err) => {
            this.closeDialog("loading-popup");
            const messages = [
              {
                severity: "error",
                summary: "Error",
                detail: "Something went wrong, please try again",
                closeAffordance: "none",
                timestamp: new Date().getTime(),
              },
            ];
            this.messagesDataprovider(new ArrayDataProvider(messages));
            this.openDialog("error");
          });
      }
    };
    this.cameraGetVideo = function () {
      this.player = document.getElementById("player");
      this.canvas = document.getElementById("canvas");
      this.context = this.canvas.getContext("2d");

      const constraints = {
        video: { facingMode: { exact: "environment" } },
      };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.player.srcObject = stream;
      });
    };
    this.cameraGetImage = () => {
      this.context.drawImage(
        this.player,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.player.srcObject.getVideoTracks().forEach((track) => track.stop());
      this.cameraGetVideo();
    };
    this.closeCam = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.player.srcObject.getVideoTracks().forEach((track) => track.stop());
    };
    this.frontImage = ko.observable("");
    this.backImage = ko.observable("");
    this.action = ko.observable("front");
    this.cameraSaveImage = () => {
      var dt = this.canvas.toDataURL("image/jpeg");
      if (this.action() === "front") {
        this.frontImage(dt);
      } else {
        this.backImage(dt);
      }
      this.closeDialog("image");
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
