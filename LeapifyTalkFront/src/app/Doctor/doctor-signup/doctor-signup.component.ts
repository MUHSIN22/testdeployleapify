import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { MappingData } from 'src/app/MappingData';
import { HttpService } from 'src/app/services/http.service';

declare var $:any;

@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.css']
})
export class DoctorSignupComponent implements OnInit {


  showErrormsg : boolean = false;
  doctorsignup! : FormGroup;
  post : any;
  // mappingdata = MappingData;
  mappingNo: number = 0;
  selections: any = [];
  ESelection: any = [];
  SSelection: any = [];
  TSelection: any = [];
  SpecialitesMapping: any;
  ExperienceMapping: any;
  TherapyMapping: any;
  mappingdata: any = [];
  specialites: any = [];
  experiences: any = [];
  therapys: any = [];

  constructor(private fb : FormBuilder, private router : Router, private httpService: HttpService,) { }

  ngOnInit(): void {

    this.httpService.Mapping().subscribe(
      (spec : any) => {
        this.mappingdata = spec;
        // console.log(this.mappingdata,'MappingData');
        this.SpecialitesMapping = this.mappingdata[1];
        this.ExperienceMapping = this.mappingdata[2];
        this.TherapyMapping = this.mappingdata[3];
      })
    // this.SpecialitesMapping = MappingData[0];
    // this.ExperienceMapping = MappingData[1];
    // this.TherapyMapping = MappingData[2];

    this.doctorsignup=this.fb.group({
      FirstName:['',[Validators.required,Validators.pattern('^[a-z,A-Z]{2,}$'),Validators.maxLength(35)]],
      LastName:['',[Validators.required,Validators.pattern('^[a-z,A-Z]{2,}$'),Validators.maxLength(25)]],
      Email:['',[Validators.required,Validators.email,Validators.maxLength(40)]],
      Password:['',[Validators.required,Validators.maxLength(25)]],
      CPassword:['',[Validators.required,Validators.maxLength(25)]],
      Mobile:['',[Validators.required,Validators.pattern('^[0-9]{10}$'),Validators.maxLength(10)]],
      UserImage:['',[]],
      Gender:['',[Validators.required,Validators.pattern('^[0-9]{1}$'),Validators.maxLength(1)]],
      Age:['',[Validators.required,Validators.pattern('^[0-9]{1,3}$'),Validators.maxLength(3)]],
      PaypalId:['',[Validators.required]],
      LicenceFile:['',[]],
      Address:['',[Validators.required]],
      Qualification:['',[Validators.required]],
      Experience:['',[Validators.required]],
      LicenceNo:['',[Validators.required]],
      AboutMe:['',[]],
      Department:['',[Validators.required]],
      ExpierenceDetails:['',[]],
      SpecialitiesDetails:['',[]],
      TherapyDetails:['',[]],
    },
    {
      validators : this.MustMach('Password', 'CPassword')
    });

// ==============================================================================

    $('fieldset').hide().eq(0).show();
    $('.page-item').hide().eq(0).show();
    $('.page-item').addClass("active");
    $("#finish-step").prop("hidden",true);
    
    $('#next-step').click(function() {
        var current = $('fieldset:visible'),
            next = current.next('fieldset');
        if (next.length === 0) {
            next = current.nextUntil('fieldset').next('fieldset');
        }
        current.hide();
        next.show();
        if (next.nextUntil('fieldset').next('fieldset').add(next.next('fieldset')).length === 0) {
            $("#next-step").prop("disabled",true);
            $("#next-step").prop("hidden",true);
            $("#finish-step").prop("hidden",false);
        }
        $("#previous-step").prop("disabled",false);  
    });
    $('#previous-step').click(function() {
        var current = $('fieldset:visible'),
            prev = current.prev('fieldset');
        if (prev.length === 0) {
            prev = current.prevUntil('fieldset').prev('fieldset');
        }
        current.hide();
        prev.show();
        if (prev.prevUntil('fieldset').prev('fieldset').add(prev.prev('fieldset')).length === 0) {
            $("#previous-step").prop("disabled",true);
        }
        $("#next-step").prop("disabled",false);
        $("#next-step").prop("hidden",false);
        $("#finish-step").prop("hidden",true);
    });

// ==================================================================================

    $('#next-step').click(function() {
    
      var current = $('.page-item:visible'),
          next = current.next('.page-item');
      if (next.length === 0) {
          next = current.nextUntil('.page-item').next('.page-item');
      }
        current.hide();
        next.show();
      if (next.nextUntil('.page-item').next('.page-item').add(next.next('.page-item')).length === 0) {
        $("#next-step").prop("disabled",true);
      }
      $("#previous-step").prop("disabled",false);
  });
  
  $('#previous-step').click(function() {
  
      var current = $('.page-item:visible'),
          prev = current.prev('.page-item');
      if (prev.length === 0) {
          prev = current.prevUntil('.page-item').prev('.page-item');
      }
        current.hide();
        prev.show();
      if (prev.prevUntil('.page-item').prev('.page-item').add(prev.prev('.page-item')).length === 0) {
        $("#previous-step").prop("disabled",true);
      }
      $("#next-step").prop("disabled",false);
  });

// ==================================================================================

}
  // ==================== Password Match Function Start =====================
  MustMach(controlName : string, matchingControlName : string)
  {
    return(formGroup:FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMach) 
      {
        return
      }
      if(control.value !== matchingControl.value)
      {
        matchingControl.setErrors({MustMatch:true});
      }
      else
      {
        matchingControl.setErrors(null);
      }
    }
  }

// ==================== Password Match Function End =====================

  //Fired when an option is selected/Deselected
  selectExperience(choice: any) {
    //For checkbox, selected options are pushed/removed to currentOptions array
    if (this.ExperienceMapping.type == 'checkbox') {
      if (choice.target.checked)
        this.ESelection.push(choice.target.value);
        // console.log(this.ESelection,"Selections 0");
    }
  }
  selectSpecialites(choice: any) {
    //For checkbox, selected options are pushed/removed to currentOptions array
    if (this.SpecialitesMapping.type == 'checkbox') {
      if (choice.target.checked)
        this.SSelection.push(choice.target.value);
        // console.log(this.SSelection,"Selections 1");
    }
  }

  selectTherapy(choice: any) {
    //For checkbox, selected options are pushed/removed to currentOptions array
    if (this.TherapyMapping.type == 'checkbox') {
      if (choice.target.checked)
        this.TSelection.push(choice.target.value);
        // console.log(this.TSelection,"Selections 2");
    }
  }

  isChecked(choice: any) {
    if (this.selections[this.mappingNo]) {
      return this.selections[this.mappingNo].selection.indexOf(choice) >= 0;
    }
    else
      return false;
  }

// ==================== Doctor Registration Function Start ========================
DoctorReg(doctorsignup: any)
{
  this.showErrormsg = true;
  if (doctorsignup.valid)
  {
    var PostJson = {
      first_name: this.doctorsignup.value.FirstName,
      last_name: this.doctorsignup.value.LastName,
      email: this.doctorsignup.value.Email,
      password: this.doctorsignup.value.Password,
      mobile: this.doctorsignup.value.Mobile,
      userimage: this.doctorsignup.value.UserImage,
      gender: this.doctorsignup.value.Gender,
      age: this.doctorsignup.value.Age,
      paypalId: this.doctorsignup.value.PaypalId,
      licenceimage: this.doctorsignup.value.LicenceFile,
      address: this.doctorsignup.value.Address,
      qualification: this.doctorsignup.value.Qualification,
      experience: this.doctorsignup.value.Experience,
      licenceNo: this.doctorsignup.value.LicenceNo,
      aboutMe: this.doctorsignup.value.AboutMe,
      department: this.doctorsignup.value.Department,
      expierenceDetails: this.ESelection,
      specialitiesDetails: this.SSelection,
      therapyDetails: this.TSelection,
      role: "Doctor"
      };
      // console.log(PostJson,'PostJson');
    // LocalStorage Set Item Data
    localStorage.setItem("UserSignUp", JSON.stringify(PostJson));
    this.router.navigate(['/user-verify']);
  }
}

// ==================== Doctor Registration Function End ========================


}
