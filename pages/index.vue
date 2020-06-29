<template>
  <div class="my-6 mx-auto max-w-lg rounded-lg shadow-md bg-white">
    <div class="py-4 flex justify-center">
      <img src="~assets/xpart_logo.png" alt="Xpart logo">
    </div>
    <hr>
    <div class="pt-4">
      <h1 class="text-red-600 text-center font-bold text-2xl">
        Company Announcement
      </h1>
      <h2 class="text-red-600 text-center font-bold">
        WE HAVE MOVED PLEASE NOTE OUR NEW ADDRESS
      </h2>
      <p class="text-gray-800 text-center font-bold py-4">
        Unit 14, Erdington Industrial Park,<br>Chester Road, Birmingham, B24 0RD
      </p>
    </div>
    <div class="hidden pt-3 px-6 pb-6">
      <h1 class="text-red-600 text-center font-bold text-2xl">
        COVID-19 Company Announcement
      </h1>
      <h2 class="text-red-600 text-center text-xl">
        31st March 2020
      </h2>
      <p class="text-gray-700 text-justify pt-2">
        XPart have taken the difficult decision to close until further notice.
      </p>
      <p class="text-gray-700 text-justify pt-2">
        Any parts enquiries will be dealt with on our return.
      </p>
      <div class="hidden">
        <h2
          class="text-red-600 text-center font-bold text-2xl"
        >
          ANNOUNCEMENT
        </h2>
        <p class="text-gray-700 text-justify">
          We are still open for business but due to some dealer closures, response times and access to some parts during the COVID-19 crisis parts availability may be disrupted, we will always keep you informed and up to date with what we can supply during this time.
        </p>
      </div>
    </div>
    <hr>
    <div class="p-6 text-gray-700">
      <div v-if="!requestSent">
        <p>
          Looking for a MG, Rover or Landrover part? Enter part number and quantity details here.
        </p>
        <div class="block flex pt-4">
          <label for="partnumber1" class="w-full">
            <input
              id="partnumber1"
              v-model="parts[0].code"
              type="text"
              class="form-input mt-1 block w-full"
              placeholder="Part Number #1"
            >
          </label>
          <label for="partquantity1">
            <input
              id="partquantity1"
              v-model="parts[0].qty"
              type="number"
              class="form-input mt-1 ml-2 block w-40"
              placeholder="Quantity"
            >
          </label>
        </div>
        <div class="block flex pt-1">
          <label for="partnumber2" class="w-full">
            <input
              id="partnumber2"
              v-model="parts[1].code"
              type="text"
              class="form-input mt-1 block w-full"
              placeholder="Part Number #2"
            >
          </label>
          <label for="partquantity2">
            <input
              id="partquantity2"
              v-model="parts[1].qty"
              type="number"
              class="form-input mt-1 ml-2 block w-40"
              placeholder="Quantity"
            >
          </label>
        </div>
        <div class="block flex pt-1">
          <label for="partnumber3" class="w-full">
            <input
              id="partnumber3"
              v-model="parts[2].code"
              type="text"
              class="form-input mt-1 block w-full"
              placeholder="Part Number #3"
            >
          </label>
          <label for="partquantity3">
            <input
              id="partquantity3"
              v-model="parts[2].qty"
              type="number"
              class="form-input mt-1 ml-2 block w-40"
              placeholder="Quantity"
            >
          </label>
        </div>
        <div class="block flex pt-1">
          <label for="partnumber4" class="w-full">
            <input
              id="partnumber4"
              v-model="parts[3].code"
              type="text"
              class="form-input mt-1 block w-full"
              placeholder="Part Number #4"
            >
          </label>
          <label for="partquantity4">
            <input
              id="partquantity4"
              v-model="parts[3].qty"
              type="number"
              class="form-input mt-1 ml-2 block w-40"
              placeholder="Quantity"
            >
          </label>
        </div>
        <div class="block flex pt-1">
          <label for="partnumber5" class="w-full">
            <input
              id="partnumber5"
              v-model="parts[4].code"
              type="text"
              class="form-input mt-1 block w-full"
              placeholder="Part Number #5"
            >
          </label>
          <label for="partquantity5">
            <input
              id="partquantity5"
              v-model="parts[4].qty"
              type="number"
              class="form-input mt-1 ml-2 block w-40"
              placeholder="Quantity"
            >
          </label>
        </div>
        <div class="pt-4 text-gray-600">
          <p>Please input up to 5 parts in the section above. If you have more than five parts to order/enquire about then please email us your requirements directly to <span class="font-semibold text-gray-700">communications@xpart.co.uk</span></p>
          <div class="pt-3 text-center font-semibold text-gray-700">
            We'll get back to you within 48 hours.
          </div>
        </div>
        <div class="block flex pt-4">
          <label for="contactname" class="w-full">
            <input
              id="contactname"
              v-model="contact_name"
              type="text"
              class="form-input mt-1 block w-full"
              placeholder="Contact Name"
            >
          </label>
          <label for="contactemail" class="w-full">
            <input
              id="contactemail"
              v-model="contact_email"
              type="email"
              class="form-input mt-1 ml-2 block w-full"
              placeholder="Contact Email"
            >
          </label>
        </div>
        <div class="block flex pt-2">
          <label for="chassisnumber" class="w-full">
            <input
              id="chassisnumber"
              v-model="chassis_number"
              type="text"
              class="form-input block w-full"
              placeholder="VIN (chassis number) (optional)"
            >
          </label>
        </div>
        <div v-if="hasErrors">
          <ul>
            <li
              v-for="(error, idx) in formErrors"
              :key="idx"
              class="text-xl text-red-600 font-semibold"
            >
              {{ error }}
            </li>
          </ul>
        </div>
        <div v-if="!sending" class="pt-4 mx-auto w-full">
          <recaptcha
            class="mx-auto"
            @error="onError"
            @success="onSuccess"
            @expired="onExpired"
          />
        </div>
        <div v-if="!sending" class="flex items-center justify-end pt-4 w-full">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="onSubmit"
          >
            Send your Request
          </button>
        </div>
        <div v-else>
          <div class="pt-4 text-center font-semibold text-2xl">
            Sending your Request ...
          </div>
        </div>
        <div class="mt-6 pt-4 border-t">
          <small>This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </small>
        </div>
      </div>
      <div v-else>
        <h2 class="text-3xl font-bold text-center">
          Thank you
        </h2>
        <p class="text-center font-semibold">
          Your request has been sent
        </p>
        <div class="pt-3 text-center font-semibold text-gray-700">
          We'll get back to you within 48 hours.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrontPage',
  data () {
    return {
      sending: false,
      contact_name: '',
      contact_email: '',
      parts: [
        { code: '', qty: '' },
        { code: '', qty: '' },
        { code: '', qty: '' },
        { code: '', qty: '' },
        { code: '', qty: '' }
      ],
      hasErrors: false,
      formValidated: true,
      formErrors: [],
      requestSent: false
    }
  },
  methods: {
    isEmail (str) {
      // eslint-disable-next-line
      const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return str.match(regexp)
    },
    async onSubmit () {
      try {
        this.hasErrors = false
        this.formErrors = []
        this.formValidated = true
        await this.$recaptcha.getResponse()
        if (this.contact_name === '') {
          this.formValidated = false
          this.formErrors.push('Contact Name Missing')
        }
        if (this.contact_email === '') {
          this.formValidated = false
          this.formErrors.push('Contact Email Missing')
        }
        if (!this.isEmail(this.contact_email)) {
          this.formValidated = false
          this.formErrors.push('Invalid Email')
        }
        if (this.parts[0].code === '' || this.parts[0].qty === '') {
          this.formValidated = false
          this.formErrors.push('Submit at least 1 Part Number/Qty')
        }
        if (this.formValidated) {
          this.sending = true
          await this.$api.post('/', {
            contact_name: this.contact_name,
            contact_email: this.contact_email,
            chassis_number: this.chassis_number,
            parts: this.parts
          }).then((response) => {
            // console.log(response.data)
            this.requestSent = true
            // this.sending = false
          }).catch(() => {
            // console.log(error)
            this.hasErrors = true
            this.formErrors.push('Server Error - Please refresh browser and try again')
            this.sending = false
          })
        } else {
          this.hasErrors = true
        }
      } catch (error) {
        // console.log(error)
        this.hasErrors = true
        this.formErrors.push('Missing reCaptcha')
      }
    },
    onError () {},
    onSuccess () {},
    onExpired () {}
  }
}
</script>
