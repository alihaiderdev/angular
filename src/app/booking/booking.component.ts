import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap } from 'rxjs';
import { AppConfigService } from './../services/app-config.service';
import { ConfigService } from './../services/config.service';
import { BookingService } from './booking.service';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  userId!: number | null;
  constructor(
    private appConfigService: AppConfigService,
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  // Cannot read properties of undefined (reading 'get')
  // guests = this.bookingForm.get('guests') as FormArray; // through the above error

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   if (params.has('userId')) {
    //     this.userId = parseInt(params.get('userId')!);
    //   }
    // });
    const userId = parseInt(this.route.snapshot.paramMap.get('userId')!);

    this.bookingForm = this.fb.group(
      {
        // roomId: new FormControl(''),
        roomId: new FormControl(
          { value: userId, disabled: true },
          { validators: [Validators.required] }
        ),
        guestName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(5),
            CustomValidator.validateName,
            CustomValidator.validateSpecialCharacter('*'),
          ],
        ],
        // guestEmail: ['', [Validators.required, Validators.email]],
        // default behavior is update value on every key press to change this behavior we can use updateOn property
        guestEmail: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          },
        ],
        bookingAmount: [''],
        mobileNumber: ['', { updateOn: 'blur' }],
        checkInDate: [new Date()],
        checkOutDate: [new Date()],
        bookingStatus: [''],
        bookingDate: [''],
        address: this.fb.group({
          addressLine1: ['', { validators: [Validators.required] }],
          addressLine2: [''],
          city: ['', { validators: [Validators.required] }],
          state: ['', { validators: [Validators.required] }],
          country: [''],
          zipCode: [''],
        }),
        // guestCount: [''],
        // guests: this.fb.array([
        //   this.fb.group({ name: '', age: new FormControl() }),
        // ]),
        guests: this.fb.array([this.addGuestControl()]),
        // termsAndConditions: [false],
        // OR
        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      },
      // we can also change the default behavior to blur at form level using this  { updateOn: 'blur' }
      { updateOn: 'blur', validators: [CustomValidator.validateStartToEndDate] } // possible values change, submit, blur. default value is change
    );
    this.getBookingData();

    // valueChanges is a stream so we have to subscribe it to see real time data
    // for each and every value changes or detect avery key press on real time
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => console.log(data));
    // });
    this.bookingForm.valueChanges
      // when sequence of data does not matter whatever data provide
      // .pipe(mergeMap((data) => this.bookingService.bookRoom(data)))
      // when you want only latest data and want to cancel the previous request then switch map is the way to go
      // .pipe(switchMap((data) => this.bookingService.bookRoom(data)))
      // when sequence of data matters it take time to complete the first request and then after completion go to the next
      .pipe(exhaustMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => {
        console.log(data);
      });
  }

  addGuestControl() {
    return this.fb.group({
      name: ['', { validators: [Validators.required] }],
      age: new FormControl(),
    });
  }

  addBooking() {
    // console.log(this.bookingForm.value); // by using this we can not access the disabled values so to get this we should use getRawValue() method
    console.log(this.bookingForm.getRawValue());
    this.bookingService
      .bookRoom(this.bookingForm.getRawValue())
      .subscribe((data) => console.log(data));

    this.bookingForm.reset({
      guestName: '',
      guestEmail: '',
      bookingAmount: '',
      mobileNumber: '',
      checkInDate: new Date(),
      checkOutDate: new Date(),
      bookingStatus: '',
      bookingDate: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [{ name: '', age: 0 }],
      tnc: false,
    });
  }

  // binding api response data in reactive form using setValue and patchValue
  getBookingData() {
    // when we using setValue so it says set value to all controls otherwise i give you error on the other hand patchValue give us relaxation so in case if we don't set values to all form controls then it will not give you errors
    // this.bookingForm.setValue({
    //   roomId: '2',
    //   guestName: 'ali',
    //   guestEmail: 'ali@gmail.com',
    //   bookingAmount: '',
    //   mobileNumber: '',
    //   checkInDate: new Date('10-feb-2020'),
    //   checkOutDate: new Date(),
    //   bookingStatus: '',
    //   bookingDate: '',
    //   address: {
    //     addressLine1: '',
    //     addressLine2: '',
    //     city: '',
    //     state: '',
    //     country: '',
    //     zipCode: '',
    //   },
    //   guests: [],
    //   tnc: false,
    // });
    this.bookingForm.patchValue({
      guestName: '',
      guestEmail: 'ali@gmail.com',
      bookingAmount: '',
      mobileNumber: '',
      checkInDate: new Date('10-feb-2020'),
      checkOutDate: new Date(),
      bookingStatus: '',
      bookingDate: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  // adding controls dynamically
  addGuest() {
    // this.guests.push(this.fb.group({ name: '', age: new FormControl() }));
    this.guests.push(this.addGuestControl());
  }

  // adding and removing controls
  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }
  removePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  deleteGuest(id: number): void {
    this.guests.removeAt(id);
  }
}
