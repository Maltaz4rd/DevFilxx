import React from 'react';
import { FooterBase } from './styles';
import GitHub from '../../assets/img/github.jpg';

function Footer() {
  return (
    <FooterBase>
      <a href="https://www.github.com/Maltaz4rd">
        <img src={GitHub} height="40" alt="Logo GitHub" />
      </a>
      <p>
        2021
        {' © '}
        <p href="">
          Ademir Gama
        </p>
      </p>
    </FooterBase>
  );
}

export default Footer;
