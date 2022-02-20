import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';
// import { MappingData } from 'src/app/MappingData';

declare var $ :any;

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  show_video : boolean = false;
  show_vr : boolean = false;
  show_txt : boolean = false;
  loggedInUser : any;
  Userdata : any;
  showErrormsg: boolean = false;
  updateuser!: FormGroup;
  updateaboutme!: FormGroup;
  updatepic!: FormGroup;
  price!: FormGroup;
  updateprice!: FormGroup;
  Pricedata: any = [];
  resdata: any;

  ProfilePic :any;
  filetoupload! : File;
  imageUrl! : string;
  SplitImage : any;
  ImgName : any;
  ImgExtension : any;
  mobile: any;
  licenceNo: any;
  experience: any;
  aboutMe: any;
  expierenceDetails: any;
  specialitiesDetails: any;
  therapyDetails: any;
  // youtubelink: any;
  googlemeetlink: any;
  zoomlink: any;
  skypelink: any;
  facebooklink: any;
  instagramlink: any;
  twitterlink: any;
  image: any;
  aboutme: boolean = false;
  address: any;

  updatespec!: FormGroup;
  // mappingdata = MappingData;
  mappingdata: any = [];
  mappingNo: number = 0;
  selections: any = [];
  ESelection: any = [];
  SSelection: any = [];
  TSelection: any = [];
  SpecialitesMapping: any;
  ExperienceMapping: any;
  TherapyMapping: any;
  update! : boolean;

  currentRate = 3;
  spec: boolean = false;

  constructor(config: NgbModalConfig, rating: NgbRatingConfig, private model : NgbModal, private httpService: HttpService, private fb: FormBuilder) 
  {
    rating.max = 5;
    rating.readonly = true;
    config.backdrop = 'static';
    config.keyboard = false;
  }

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

    this.updatespec = this.fb.group({
      ExpierenceDetails:['',[]],
      SpecialitiesDetails:['',[]],
      TherapyDetails:['',[]],
    });

    this.price = this.fb.group({
      ta_value:['',[Validators.required]],
      // ct_value:['',[Validators.required]],
      g_value:['',[]],
      z_value:['',[]],
      s_value:['',[]],
      // aa_value:['',[]],
      v_value:['',[]],
      v_price:['',[]],
      v_bundle:['',[]],
      v_discount:['',[]],
      vr_value:['',[]],
      vr_price:['',[]],
      vr_bundle:['',[]],
      vr_discount:['',[]],
      txt_value:['',[]],
      txt_price:['',[]],
      txt_bundle:['',[]],
      txt_discount:['',[]],
    });

    this.updateprice = this.fb.group({
      ta_value:['',[  ]],
      g_value:['',[]],
      z_value:['',[]],
      s_value:['',[]],
      // aa_value:['',[]],
      v_value:['',[]],
      v_price:['',[]],
      v_bundle:['',[]],
      v_discount:['',[]],
      vr_value:['',[]],
      vr_price:['',[]],
      vr_bundle:['',[]],
      vr_discount:['',[]],
      txt_value:['',[]],
      txt_price:['',[]],
      txt_bundle:['',[]],
      txt_discount:['',[]],
    });

    this.updateuser = this.fb.group({
      Image: [],
      Experience: ['', [Validators.required]],
      Mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10)]],
      // Youtubelink: ['', []],
      GoogleMeetlink: ['', []],
      Zoomlink: ['', []],
      Skypelink: ['', []],
      Facebooklink: ['', []],
      Instagramlink: ['', []],
      Twitterlink: ['', []],
    });
    this.updateaboutme = this.fb.group({
      AboutMe: ['', []]
    });
    this.updatepic = this.fb.group({
      Image: ['', []]
    });

    this.httpService.userSubject.subscribe(
      (user)=>{
        this.loggedInUser = user;
      })
      // console.log(this.loggedInUser.email);
      this.UserData();
      this.PriceData();
    }

// =================== Update Spec Start ========================
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
// =================== Update Spec End ==========================
// ================== Get User Data Start =====================================
  UserData() 
  {
    var Email = { email: this.loggedInUser.email }
    // console.log(Email,"Email");
    this.httpService.UserData(Email).subscribe(
      (res : any) => {
        this.Userdata = res;
        // console.log(this.Userdata,"DoctorData");
        // console.log(this.Userdata.image,"DoctorInage");
        this.mobile = this.Userdata.mobile;
        this.licenceNo = this.Userdata.licenceNo;
        this.experience = this.Userdata.experience;
        this.address = this.Userdata.address;
        this.aboutMe = this.Userdata.aboutMe;
        this.expierenceDetails = this.Userdata.expierenceDetails;
        this.specialitiesDetails = this.Userdata.specialitiesDetails;
        this.therapyDetails = this.Userdata.therapyDetails;
        // this.youtubelink = this.Userdata.youtubelink;
        this.googlemeetlink = this.Userdata.googlemeetlink;
        this.zoomlink = this.Userdata.zoomlink;
        this.skypelink = this.Userdata.skypelink;
        this.facebooklink = this.Userdata.facebooklink;
        this.instagramlink = this.Userdata.instagramlink;
        this.twitterlink = this.Userdata.twitterlink;
        this.image = this.Userdata.image;
        ///////////////////////////////////////////////////////////////////
        this.updateuser.controls["Experience"].setValue(this.experience),
        this.updateuser.controls["Mobile"].setValue(this.mobile),
        // this.updateuser.controls["Youtubelink"].setValue(this.youtubelink),
        this.updateuser.controls["GoogleMeetlink"].setValue(this.googlemeetlink),
        this.updateuser.controls["Zoomlink"].setValue(this.zoomlink),
        this.updateuser.controls["Skypelink"].setValue(this.skypelink),
        this.updateuser.controls["Facebooklink"].setValue(this.facebooklink),
        this.updateuser.controls["Instagramlink"].setValue(this.instagramlink),
        this.updateuser.controls["Twitterlink"].setValue(this.twitterlink)
        // this.updatepic.controls["Image"].setValue(this.image)
      /////////////////////////////////////////////////////////////////////
      })
  }

  // ======================= Get User Data End =====================================

  openXl(content : any)
  {
    this.model.open(content, { size: 'xl', backdropClass : 'backdrop-color' });
  }

  acc_mgmt(content2 : any)
  {    
    this.model.open(content2, { size: 'xl', backdropClass : 'backdrop-color' });
  }

  PriceForm(price : any)
  {
    this.showErrormsg = true;
    if (price.valid) {
      var PriceJson = {
        email: this.loggedInUser.email,
        ta_value: this.price.value.ta_value,
        // ct_value: this.price.value.ct_value,
        g_value: this.price.value.g_value == false || '' ? '' : this.price.value.g_value,
        z_value: this.price.value.z_value == false || '' ? '' : this.price.value.z_value,
        s_value: this.price.value.s_value == false || '' ? '' : this.price.value.s_value,
        // aa_value: this.price.value.aa_value,
        v_value: this.price.value.v_value == false || '' ? '' : this.price.value.v_value,
        v_price: this.price.value.v_price == '' ? 0 : this.price.value.v_price,
        v_bundle: this.price.value.v_bundle == '' ? 0 : this.price.value.v_bundle,
        v_discount: this.price.value.v_discount == '' ? 0 : this.price.value.v_discount,
        vr_value: this.price.value.vr_value == false || '' ? '' : this.price.value.vr_value,
        vr_price: this.price.value.vr_price == '' ? 0 : this.price.value.vr_price,
        vr_bundle: this.price.value.vr_bundle == '' ? 0 : this.price.value.vr_bundle,
        vr_discount: this.price.value.vr_discount == '' ? 0 : this.price.value.vr_discount,
        txt_value: this.price.value.txt_value == false || '' ? '' : this.price.value.txt_value,
        txt_price: this.price.value.txt_price == '' ? 0 : this.price.value.txt_price,
        txt_bundle: this.price.value.txt_bundle == '' ? 0 : this.price.value.txt_bundle,
        txt_discount: this.price.value.txt_discount == '' ? 0 : this.price.value.txt_discount,
      }
      this.httpService.DoctorPrice(PriceJson).subscribe(
        (post : any) => {
          this.resdata = post;
          // alert(this.resdata.msg);
          // console.log(post,'Post');
          window.location.reload();
        });
    }

  }
  UpdatePrice(updateprice : any)
  {
    this.showErrormsg = true;
    if(updateprice.valid)
    {
      var UpdatePriceJson = {
        email: this.loggedInUser.email,
        ta_value: this.updateprice.value.ta_value,
        g_value: this.updateprice.value.g_value == false || '' ? '' : this.updateprice.value.g_value,
        z_value: this.updateprice.value.z_value == false || '' ? '' : this.updateprice.value.z_value,
        s_value: this.updateprice.value.s_value == false || '' ? '' : this.updateprice.value.s_value,
        v_value: this.updateprice.value.v_value == false || '' ? '' : this.updateprice.value.v_value,
        v_price: this.updateprice.value.v_price == '' ? 0 : this.updateprice.value.v_price,
        v_bundle: this.updateprice.value.v_bundle == '' ? 0 : this.updateprice.value.v_bundle,
        v_discount: this.updateprice.value.v_discount == '' ? 0 : this.updateprice.value.v_discount,
        vr_value: this.updateprice.value.vr_value == false || '' ? '' : this.updateprice.value.vr_value,
        vr_price: this.updateprice.value.vr_price == '' ? 0 : this.updateprice.value.vr_price,
        vr_bundle: this.updateprice.value.vr_bundle == '' ? 0 : this.updateprice.value.vr_bundle,
        vr_discount: this.updateprice.value.vr_discount == '' ? 0 : this.updateprice.value.vr_discount,
        txt_value: this.updateprice.value.txt_value == false || '' ? '' : this.updateprice.value.txt_value,
        txt_price: this.updateprice.value.txt_price == '' ? 0 : this.updateprice.value.txt_price,
        txt_bundle: this.updateprice.value.txt_bundle == '' ? 0 : this.updateprice.value.txt_bundle,
        txt_discount: this.updateprice.value.txt_discount == '' ? 0 : this.updateprice.value.txt_discount,
      }
      // console.log(UpdatePriceJson);
      this.httpService.DoctorUpdatePrice(UpdatePriceJson).subscribe(
        (post : any) => {
          this.resdata = post;
          // alert(this.resdata.msg);
          // console.log(post,'Post');
          window.location.reload();
        });
    }
  }
  // ================== Get Price Data Start =====================================
  PriceData()
  {
    var Email = { email: this.loggedInUser.email }
    // console.log(Email,"Email");
    this.httpService.PriceData(Email).subscribe(
      (res : any) => {
        this.Pricedata = res;
        // console.log(this.Pricedata[0],"PriceData.v_price");
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.updateprice.controls["ta_value"].setValue(this.Pricedata[0].ta_value);
        this.updateprice.controls["g_value"].setValue(this.Pricedata[0].g_value == false || '' ? '' : this.Pricedata[0].g_value);
        this.updateprice.controls["z_value"].setValue(this.Pricedata[0].z_value == false || '' ? '' : this.Pricedata[0].z_value);
        this.updateprice.controls["s_value"].setValue(this.Pricedata[0].s_value == false || '' ? '' : this.Pricedata[0].s_value);
        this.updateprice.controls["v_value"].setValue(this.Pricedata[0].v_value == false || '' ? '' : this.Pricedata[0].v_value);
        this.updateprice.controls["v_price"].setValue(this.Pricedata[0].v_price == false ? '' : this.Pricedata[0].v_price);
        this.updateprice.controls["v_bundle"].setValue(this.Pricedata[0].v_bundle == false ? '' : this.Pricedata[0].v_bundle);
        this.updateprice.controls["v_discount"].setValue(this.Pricedata[0].v_discount == false ? '' : this.Pricedata[0].v_discount);
        this.updateprice.controls["vr_value"].setValue(this.Pricedata[0].vr_value == false || '' ? '' : this.Pricedata[0].vr_value);
        this.updateprice.controls["vr_price"].setValue(this.Pricedata[0].vr_price == false ? '' : this.Pricedata[0].vr_price);
        this.updateprice.controls["vr_bundle"].setValue(this.Pricedata[0].vr_bundle == false ? '' : this.Pricedata[0].vr_bundle);
        this.updateprice.controls["vr_discount"].setValue(this.Pricedata[0].vr_discount == false ? '' : this.Pricedata[0].vr_discount);
        this.updateprice.controls["txt_value"].setValue(this.Pricedata[0].txt_value == false || '' ? '' : this.Pricedata[0].txt_value);
        this.updateprice.controls["txt_price"].setValue(this.Pricedata[0].txt_price == false ? '' : this.Pricedata[0].txt_price);
        this.updateprice.controls["txt_bundle"].setValue(this.Pricedata[0].txt_bundle == false ? '' : this.Pricedata[0].txt_bundle);
        this.updateprice.controls["txt_discount"].setValue(this.Pricedata[0].txt_discount == false ? '' : this.Pricedata[0].txt_discount);
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      })
  }

  // ======================= Get Price Data End =====================================
 
   ///////////////////////////// File Upload Start ///////////////////////////////////
onFileSelected(event : any)
{
  if (event.target.files.length > 0) 
  {
    this.filetoupload = event.target.files.item(0);
    
    this.ImgName = this.filetoupload.name;
    this.SplitImage = this.ImgName.split(".");
    this.ImgExtension = this.SplitImage[1];
    // ============================================
    if( this.ImgExtension == "jpg" || this.ImgExtension == "png")
    {
      // Show Image 
      var reader = new FileReader();
      reader.onload = (event:any) => 
      {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.filetoupload);
    }
    else if(this.ImgExtension != "jpg" || this.ImgExtension != "png")
    {
      this.ImgName = null;
     alert('Only jpg, png files are allowed');
    }
    // ============================================
  }
}
  ///////////////////////////// File Upload End ///////////////////////////////////////////

  // ==================== Client Update Function Start ========================
  UserUpdate(updateuser: any) {
    this.showErrormsg = true;
    if (updateuser.valid) {
      var fd = new FormData();
        fd.append('email', this.loggedInUser.email);
        fd.append('experience', this.updateuser.value.Experience);
        fd.append('mobile', this.updateuser.value.Mobile);
        // fd.append('youtubelink', this.updateuser.value.Youtubelink);
        fd.append('googlemeetlink', this.updateuser.value.GoogleMeetlink);
        fd.append('zoomlink', this.updateuser.value.Zoomlink);
        fd.append('skypelink', this.updateuser.value.Skypelink);
        fd.append('facebooklink', this.updateuser.value.Facebooklink);
        fd.append('instagramlink', this.updateuser.value.Instagramlink);
        fd.append('twitterlink', this.updateuser.value.Twitterlink);
        fd.append('file', this.filetoupload);
      //   console.log(fd,"formdata");
      this.httpService.DoctorUpdate(fd).subscribe(
        (post : any) => {
          this.resdata = post;
          alert(this.resdata.msg);
          console.log(post,'Post');
          window.location.reload();
        });
    }
  }

// ==================== Client Update Function End ========================
// ====================== AboutMe Start ====================================
AboutMeEdit() {
  this.aboutme = !this.aboutme;
  this.updateaboutme.controls["AboutMe"].setValue(this.Userdata.aboutMe)
}
AboutMeUpdate(updateaboutme: any)
{
  if (updateaboutme.valid) {
    var AboutMeJson = {
      aboutMe: this.updateaboutme.value.AboutMe,
      email: this.Userdata.email
    }
    // console.log(AboutMeJson);
    this.httpService.AboutmeUpdate(AboutMeJson).subscribe(
      (post : any) => {
        this.resdata = post;
        alert(this.resdata.msg);
        window.location.reload();
      });
  }
}
// ====================== AboutMe End ======================================
// ====================== Edit Specialities Start ==========================
EditSpecialities() {
  this.spec = !this.spec;
  this.updatespec.controls["expierenceDetails"].setValue(this.Userdata.expierenceDetails);
  this.updatespec.controls["specialitiesDetails"].setValue(this.Userdata.specialitiesDetails);
  this.updatespec.controls["therapyDetails"].setValue(this.Userdata.therapyDetails);
}
UpdateSpec(updatespec: any)
  {
    if (updatespec.valid) {
      var SpecJson = {
        expierenceDetails: this.ESelection,
        specialitiesDetails: this.SSelection,
        therapyDetails: this.TSelection,
        email: this.Userdata.email
      }
      // console.log(SpecJson);
      this.httpService.SpecUpdate(SpecJson).subscribe(
        (post : any) => {
          this.resdata = post;
          alert(this.resdata.msg);
          window.location.reload();
        });
    }
    
  }
// ===================== Edit Specialities End =============================


}
