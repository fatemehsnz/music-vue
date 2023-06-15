import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces,
  email,
  min_value,
  max_value,
  confirmed,
  not_one_of
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alpha_spaces)
    defineRule('email', email)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('confirmed', confirmed)
    defineRule('not_one_of', not_one_of)
    defineRule('country_excluded', not_one_of)

    configure({
      generateMessage: (context) => {
        const messages = {
          required: `the field ${context.field} is required.`,
          min: `the field ${context.field} is too short.`,
          max: `the field ${context.field} is too long.`,
          alpha_spaces: `the field ${context.field} may only containe alphabetical characters and spaces.`,
          email: `the field ${context.field} must be a valid email.`,
          min_value: `the field ${context.field} is too low.`,
          max_value: `the field ${context.field} is too high.`,
          not_one_of: `you are not allowed to use this value for the field ${context.field}.`,
          country_excluded: 'Due to restrictions we dont accept users from this location.',
          confirmed: "the password don't match",
          tos: 'you must accept the Terms of Service'
        }
        const message = messages[context.rule.name]
          ? messages[context.rule.name]
          : `the field ${context.field} is invalid.`

        return message
      }
      //--Validation Triggers
      // validateOnBlur :true,   //default is true
      // validateOnChange: true,  //default is true
      // validateOnInput: false,  //default is false (immediatly when user presses a key)
      // validateOnModelUpdate: true,  //default is true
    })
  }
}
