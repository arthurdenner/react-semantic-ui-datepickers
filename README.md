# 📆 react-semantic-ui-datepickers

Datepickers built with [Semantic UI for React][semantic-ui-react] and [Dayzed][dayzed]

[![version][version-badge]][package]
[![MIT License][license-badge]][license]
[![All Contributors](https://img.shields.io/badge/all_contributors-14-orange.svg?style=flat-square)](#contributors)

## Overview

Semantic UI for React doesn't have a datepicker and the best solutions don't fit with its design. This library tries to solve this problem providing a component that can act as a basic or range datepicker.

It supports most props of Form.Input and Dayzed components. Check the [supported props section](#supported-props) for more information.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [📆 react-semantic-ui-datepickers](#-react-semantic-ui-datepickers)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Supported Props](#supported-props)
    - [Own Props](#own-props)
    - [Form.Input Props](#forminput-props)
    - [Dayzed Props](#dayzed-props)
  - [Customization](#customization)
  - [Roadmap](#roadmap)
  - [Contributors](#contributors)
  - [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install --save react-semantic-ui-datepickers
```

```
yarn add react-semantic-ui-datepickers
```

> This package also depends on `react` and `semantic-ui-react`. Please make sure you have them installed as well.

## Usage

```jsx
import React, { useState } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

const AppWithBasic = () => {
  const [currentDate, setNewDate] = useState(null);
  const onChange = (event, data) => setNewDate(data.value);

  return <SemanticDatepicker onChange={onChange} />;
};

const AppWithRangeAndInPortuguese = () => {
  const [currentRange, setNewRange] = useState([]);
  const onChange = (event, data) => setNewRange(data.value);

  return <SemanticDatepicker locale="pt-BR" onChange={onChange} type="range" />;
};
```

More examples [here](https://react-semantic-ui-datepickers.now.sh).

## Supported Props

### Own Props

| property             | type                                | required | default             | description                                                                                                                                                                 |
| -------------------- | ----------------------------------- | -------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowOnlyNumbers     | boolean                             | no       | true                | Allows the user enter only numbers                                                                                                                                          |
| autoComplete         | string                              | no       | --                  | Specifies if the input should have autocomplete enabled                                                                                                                     |
| clearIcon            | SemanticICONS \| React.ReactElement | no       | 'close'             | An [icon from semantic-ui-react](https://react.semantic-ui.com/elements/icon/) or a custom component. The custom component will get two props: `data-testid` and `onClick`. |
| clearOnSameDateClick | boolean                             | no       | true                | Controls whether the datepicker's state resets if the same date is selected in succession.                                                                                  |
| clearable            | boolean                             | no       | true                | Allows the user to clear the value                                                                                                                                          |
| datePickerOnly       | boolean                             | no       | false               | Allows the date to be selected only via the date picker and disables the text input                                                                                         |
| filterDate           | function                            | no       | (date) => true      | Function that receives each date and returns a boolean to indicate whether it is enabled or not                                                                             |
| format               | string                              | no       | 'YYYY-MM-DD'        | Specifies how the date will be formatted using the [date-fns' format](https://date-fns.org/v1.29.0/docs/format)                                                             |
| icon                 | SemanticICONS \| React.ReactElement | no       | 'calendar'          | An [icon from semantic-ui-react](https://react.semantic-ui.com/elements/icon/) or a custom component. The custom component will get two props: `data-testid` and `onClick`. |
| inline               | boolean                             | no       | false               | Uses an inline variant, without the input and the features related to it, e.g. clearable datepicker                                                                         |
| keepOpenOnClear      | boolean                             | no       | false               | Keeps the datepicker open (or opens it if it's closed) when the clear icon is clicked                                                                                       |
| keepOpenOnSelect     | boolean                             | no       | false               | Keeps the datepicker open when a date is selected                                                                                                                           |
| locale               | string                              | no       | 'en-US'             | Filename of the locale to be used. PS: Feel free to submit PR's with more locales!                                                                                          |
| onBlur               | function                            | no       | (event) => {}       | Callback fired when the input loses focus                                                                                                                                   |
| onFocus              | function                            | no       | (event) => {}       | Callback fired when the input gets focused focus                                                                                                                            |
| onChange             | function                            | no       | (event, data) => {} | Callback fired when the value changes                                                                                                                                       |
| pointing             | string                              | no       | 'left'              | Location to render the component around input. Available options: 'left', 'right', 'top left', 'top right'                                                                  |
| showToday            | boolean                             | no       | true                | Hides the "Today" button if false                                                                                                                                           |
| type                 | string                              | no       | basic               | Type of input to render. Available options: 'basic' and 'range'                                                                                                             |
| value                | Date\|Date[]                        | no       | --                  | The value of the datepicker                                                                                                                                                 |

### Form.Input Props

- autoComplete
- className
- disabled
- error
- iconPosition
- id
- inverted
- label
- loading
- name
- placeholder
- size
- transparent
- readOnly

### Dayzed Props

- date
- maxDate
- minDate
- firstDayOfWeek
- showOutsideDays
- selected

## Customization

In order to customize the elements, you can override the styles of the classes below:

- clndr-cell
- clndr-cell-today
- clndr-cell-inrange
- clndr-cell-disabled
- clndr-cell-selected
- clndr-cell-other-month

> If you think this way of customizing is not a good idea, feel free to open an issue suggesting something else. This was the simplest solution I thought.

## Roadmap

- Add more tests (including e2e)

> Feel free to open issues and/or create PRs to improve other aspects of the library!

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/arthurdenner"><img src="https://avatars0.githubusercontent.com/u/13774309?v=4" width="100px;" alt=""/><br /><sub><b>Arthur Denner</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=arthurdenner" title="Code">💻</a> <a href="#design-arthurdenner" title="Design">🎨</a> <a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=arthurdenner" title="Documentation">📖</a> <a href="#example-arthurdenner" title="Examples">💡</a> <a href="#ideas-arthurdenner" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://twitter.com/elaurent_"><img src="https://avatars2.githubusercontent.com/u/10627086?v=4" width="100px;" alt=""/><br /><sub><b>Emerson Laurentino</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=emersonlaurentino" title="Code">💻</a> <a href="#ideas-emersonlaurentino" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=emersonlaurentino" title="Documentation">📖</a> <a href="#example-emersonlaurentino" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/lucasnsborges"><img src="https://avatars2.githubusercontent.com/u/12260334?v=4" width="100px;" alt=""/><br /><sub><b>Lucas Borges</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=lucasnsborges" title="Code">💻</a> <a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=lucasnsborges" title="Documentation">📖</a> <a href="#example-lucasnsborges" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/rallysson"><img src="https://avatars3.githubusercontent.com/u/12260324?v=4" width="100px;" alt=""/><br /><sub><b>Rallysson</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=rallysson" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/saminnet"><img src="https://avatars1.githubusercontent.com/u/5575369?v=4" width="100px;" alt=""/><br /><sub><b>Samin Yousefnia</b></sub></a><br /><a href="#translation-saminnet" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/jalavosus"><img src="https://avatars3.githubusercontent.com/u/5103026?v=4" width="100px;" alt=""/><br /><sub><b>James J. Alavosus</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=jalavosus" title="Code">💻</a> <a href="#example-jalavosus" title="Examples">💡</a> <a href="#ideas-jalavosus" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://medium.com/@jaaaco"><img src="https://avatars3.githubusercontent.com/u/450726?v=4" width="100px;" alt=""/><br /><sub><b>Jakub Wietrzyk</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=jaaaco" title="Code">💻</a> <a href="#translation-jaaaco" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/benhancockco"><img src="https://avatars3.githubusercontent.com/u/20491242?v=4" width="100px;" alt=""/><br /><sub><b>Ben Hancock</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=benhancockco" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Gallevy"><img src="https://avatars2.githubusercontent.com/u/17080607?v=4" width="100px;" alt=""/><br /><sub><b>Gallevy</b></sub></a><br /><a href="#translation-Gallevy" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/adamxtokyo"><img src="https://avatars3.githubusercontent.com/u/13076573?v=4" width="100px;" alt=""/><br /><sub><b>Adam Grawender</b></sub></a><br /><a href="#translation-adamxtokyo" title="Translation">🌍</a></td>
    <td align="center"><a href="https://www.xzessmedia.de"><img src="https://avatars2.githubusercontent.com/u/3153586?v=4" width="100px;" alt=""/><br /><sub><b>xzessmedia</b></sub></a><br /><a href="#translation-xzessmedia" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/oriolhub"><img src="https://avatars3.githubusercontent.com/u/33755729?v=4" width="100px;" alt=""/><br /><sub><b>oriolhub</b></sub></a><br /><a href="#translation-oriolhub" title="Translation">🌍</a></td>
    <td align="center"><a href="http://colinramsay.co.uk"><img src="https://avatars2.githubusercontent.com/u/72954?v=4" width="100px;" alt=""/><br /><sub><b>Colin Ramsay</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=colinramsay" title="Code">💻</a></td>
    <td align="center"><a href="https://instagram.com/gencerwgenc"><img src="https://avatars0.githubusercontent.com/u/1711576?v=4" width="100px;" alt=""/><br /><sub><b>Gencer W. Genç</b></sub></a><br /><a href="#translation-gencer" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/pivotal-james-zcheng"><img src="https://avatars3.githubusercontent.com/u/9889963?v=4" width="100px;" alt=""/><br /><sub><b>pivotal-james-zcheng</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=pivotal-james-zcheng" title="Code">💻</a></td>
    <td align="center"><a href="http://christianmoen.me"><img src="https://avatars1.githubusercontent.com/u/2778221?v=4" width="100px;" alt=""/><br /><sub><b>Christian Moen</b></sub></a><br /><a href="#translation-Cmoen11" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.artawood.net"><img src="https://avatars0.githubusercontent.com/u/9616109?v=4" width="100px;" alt=""/><br /><sub><b>Artawood Chitamitara</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=artawood" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/unbugged"><img src="https://avatars2.githubusercontent.com/u/6146052?v=4" width="100px;" alt=""/><br /><sub><b>unbugged</b></sub></a><br /><a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/commits?author=unbugged" title="Code">💻</a> <a href="https://github.com/arthurdenner/react-semantic-ui-datepickers/issues?q=author%3Aunbugged" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://velog.io/@syj9484"><img src="https://avatars2.githubusercontent.com/u/60685930?v=4" width="100px;" alt=""/><br /><sub><b>Shin YeongJae</b></sub></a><br /><a href="#translation-Yeongjae-Shin" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/JorgenVatle"><img src="https://avatars0.githubusercontent.com/u/4034561?v=4" width="100px;" alt=""/><br /><sub><b>Jørgen Vatle</b></sub></a><br /><a href="#translation-JorgenVatle" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## LICENSE

MIT

[license-badge]: https://img.shields.io/npm/l/react-semantic-ui-datepickers.svg?style=flat-square
[license]: https://github.com/arthurdenner/react-semantic-ui-datepickers/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/react-semantic-ui-datepickers.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-semantic-ui-datepickers
[dayzed]: https://github.com/deseretdigital/dayzed
[semantic-ui-react]: https://react.semantic-ui.com/
