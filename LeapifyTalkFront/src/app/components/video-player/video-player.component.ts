import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { duration } from 'moment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('video') player?:ElementRef;
  @ViewChild('soundControl') sound?:ElementRef;
  @Output() isStretch = new EventEmitter()
  @Output() videoDurationEmitter = new EventEmitter();
  @Output() sectionProgressEmitter = new EventEmitter();
  @Input() isClosed:boolean = false;
  @Input() videoLink:any;
  public isVideoPlaying:boolean = false
  public videoDuration:any = 0;
  public videoProgress:number = 0;
  public isVideoEnd:boolean = false
  public isBuffer:boolean = false
  public isChange:boolean = false
  public isFullScreen:boolean = false;
  public stretch:boolean = false;
  public isControls:boolean = true;
  public volume:any = 100
  constructor(public elementRef: ElementRef) { }


  ngOnInit(): void {
    this.player?.nativeElement.addEventListener('waiting',()=>{
      this.isBuffer = true
    })
    setTimeout(()=>{
      this.isControls = false
    },6000)
    
  }

  ngAfterViewInit(): void {
    this.videoDuration = this.player?.nativeElement.duration 
    this.videoDurationEmitter.emit(this.videoDuration)
    
    let videoPlayer = this.elementRef.nativeElement.querySelector('.video')
    videoPlayer.addEventListener('waiting',() => {this.isBuffer = true})
    videoPlayer.addEventListener('playing',() => {this.isBuffer = false})
    videoPlayer.addEventListener('timeupdate',this.setProgress);
    videoPlayer.addEventListener('ended',this.handleSectionProgress)
    videoPlayer.addEventListener('fullscreenchange',() => {
      if(this.isFullScreen && this.isChange){
        this.isFullScreen = false
        this.isChange = false
      }else{
        this.isChange = true
      }
    })
  }

  changeVolume = (event:any) => {
    this.volume = ((event.target.value * 10)/100)
    if(this.player?.nativeElement){
      this.player.nativeElement.volume = this.volume
    }
    
  }

  // For handling the section progress
  handleSectionProgress = () => {
    this.sectionProgressEmitter.emit(true)
  }

  // Set or reset fullscreen 
  setOrResetFullScreen = () =>{
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.isFullScreen = false;
    }else if (this.player?.nativeElement.webkitRequestFullscreen) {
      // Need this to support Safari
      this.player?.nativeElement.webkitRequestFullscreen();
      this.isFullScreen = true;
    } else {
      this.player?.nativeElement.requestFullscreen();
      this.isFullScreen = true;
    }
  }

  // Pause and play video
  playVideo = () => {

    if(this.isVideoPlaying) {
      this.isVideoPlaying = false;
      this.player?.nativeElement.pause();
    }else{
      this.isVideoPlaying = true;
      this.player?.nativeElement.play();
    }
  }

  changeProgress = (event:any) => {
    this.videoProgress = Math.round(event.layerX / event.target.offsetWidth * 100)
    this.player?.nativeElement.currentTime ? this.player.nativeElement.currentTime = (this.videoProgress*this.player?.nativeElement.duration)/100 : null
    
  }

  setProgress = () => {
    let currentTime = this.player?.nativeElement.currentTime
    let duration = this.player?.nativeElement.duration
    this.videoProgress = Math.round((currentTime/duration)*100)
    
    if(this.videoProgress === 100){
      this.isVideoEnd = true
      this.isVideoPlaying = false
    }
  }

  stretchToEnd = () => {
    this.isStretch.emit(!this.stretch)
    this.stretch = !this.stretch
  }

  onMouseOver = () =>{
    this.isControls = true
  }

  onMouseOut = () =>{
    setTimeout(() => {
      this.isControls = false
    },6000)
  }
}
