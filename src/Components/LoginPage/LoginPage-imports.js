// General
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NotificationManager from 'react-notifications/lib/NotificationManager';

// Services
import { PublicAPI } from '../../Services/AjaxService';
import { 
    GetFromStorage, 
    SaveToStorage,
    DeleteFromStorage
} from "../../Services/StorageService";

// Components
import BreakLine from '../BreakLine';
import Recaptcha from '../ReCAPTCHA';
import FormPageLayout from '../FormPageLayout';
import { FormInput } from '../FormInput';
import SendButton from '../SendButton';

// Constants
import { recoveryPath, registerPath } from "../../Constants/pagesPath";
import config from "../../Constants/config.json";
import { emailRegex, passwordRegex } from '../../Constants/regex';
import { apiPath } from '../ProfilePage/Profile-Import';
import { providerTag } from '../../Constants/storageTag';

export {
    GetFromStorage,
    SaveToStorage,
    DeleteFromStorage,
    providerTag,
    useRef,
    useState,
    useEffect,
    PropTypes,
    Link,
    NotificationManager,
    PublicAPI,
    BreakLine,
    Recaptcha,
    FormPageLayout,
    FormInput,
    SendButton,
    recoveryPath,
    registerPath,
    config,
    emailRegex,
    passwordRegex,
    apiPath,
};