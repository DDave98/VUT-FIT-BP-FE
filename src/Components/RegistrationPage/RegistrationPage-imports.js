import FormPageLayout from '../FormPageLayout';
import { loginPath, confirmPath } from "../../Constants/pagesPath";
import { FormInput } from '../FormInput';
import { FormPwdInputs } from '../FormPwdInputs';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nameRegex, passwordRegex, emailRegex } from '../../Constants/regex';
import { PublicAPI } from '../../Services/AjaxService';
import config from "../../Constants/config.json";
import SendButton from '../SendButton';
import Recaptcha from '../ReCAPTCHA';
import { consoleLog } from '../../Services/DebugService';

