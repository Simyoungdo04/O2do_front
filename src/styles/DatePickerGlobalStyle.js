import { createGlobalStyle } from "styled-components";

export const DatePickerGlobalStyle = createGlobalStyle`
  .react-datepicker-popper {
    z-index: 30;
  }

  .react-datepicker {
    font-family: ${({ theme }) => theme.font};
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.md};
    box-shadow: ${({ theme }) => theme.shadow.md};
    overflow: hidden;
  }

  .react-datepicker__month-container,
  .react-datepicker__time-container,
  .react-datepicker__time-box {
    background: ${({ theme }) => theme.color.surface};
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__header {
    background: ${({ theme }) => theme.color.bgSoft};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header {
    color: ${({ theme }) => theme.color.text};
    font-weight: 700;
    font-size: 19px;
    padding: 6px 0;
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.color.sub};
    font-size: 14px;
  }

  .react-datepicker__month {
    margin: 14px;
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.color.sub};
  }

  .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.color.point};
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    width: 3.4rem;
    line-height: 3.4rem;
  }

  .react-datepicker__day {
    color: ${({ theme }) => theme.color.text};
    font-size: 16px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  .react-datepicker__day:hover {
    background: ${({ theme }) => theme.color.pointSoft};
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  .react-datepicker__day--today {
    font-weight: 800;
    color: ${({ theme }) => theme.color.point};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: ${({ theme }) => theme.color.point};
    color: #fff;
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  .react-datepicker__day--selected:not([aria-disabled=true]):hover,
  .react-datepicker__day--keyboard-selected:not([aria-disabled=true]):hover {
    background: ${({ theme }) => theme.color.pointHover} !important;
  }

  .react-datepicker__day--disabled,
  .react-datepicker__day--outside-month {
    color: ${({ theme }) => theme.color.disabled};
    cursor: not-allowed;
  }

  .react-datepicker__day--disabled:hover {
    background: transparent;
  }

  .day-all-done,
  .day-has-pending {
    position: relative;
  }

  .day-all-done::after,
  .day-has-pending::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 6px;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  .day-all-done::after {
    background: ${({ theme }) => theme.color.success};
  }

  .day-has-pending::after {
    background: ${({ theme }) => theme.color.point};
  }

  .react-datepicker__time-container {
    border-left: 1px solid ${({ theme }) => theme.color.border};
  }

  .react-datepicker__time-list-item {
    color: ${({ theme }) => theme.color.text};
    display: flex !important;
    align-items: center;
  }

  .react-datepicker__time-list-item:hover {
    background: ${({ theme }) => theme.color.pointSoft} !important;
  }

  .react-datepicker__time-list-item--selected {
    background: ${({ theme }) => theme.color.point} !important;
    color: #fff !important;
    font-weight: 700;
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  .react-datepicker__time-list-item--disabled {
    color: ${({ theme }) => theme.color.disabled} !important;
    cursor: not-allowed;
  }

  .react-datepicker__children-container {
    clear: both;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;
