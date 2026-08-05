import styled from "styled-components";

export const WheelFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  background: ${({ theme }) => theme.color.inputBg};
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  border-radius: ${({ theme }) => theme.radius.sm};

  [data-rwp-wrapper] {
    width: 100%;
  }

  [data-rwp] {
    height: 168px;
  }

  [data-rwp-highlight-wrapper] {
    background: ${({ theme }) => theme.color.pointSoft};
    border-top: 1px solid ${({ theme }) => theme.color.point};
    border-bottom: 1px solid ${({ theme }) => theme.color.point};
  }

  [data-rwp-highlight-item] {
    color: ${({ theme }) => theme.color.pointDark};
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  [data-rwp-option] {
    color: ${({ theme }) => theme.color.text};
    font-variant-numeric: tabular-nums;
  }

  [data-rwp-option][data-disabled] {
    color: ${({ theme }) => theme.color.disabled};
  }
`;

export const Separator = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.sub};
  flex-shrink: 0;
`;

export const PeriodColumn = styled.div`
  position: relative;
  width: 40px;
  height: 168px;
  flex-shrink: 0;
`;

const PERIOD_TOP = {
  above: "calc(50% - 54px)",
  center: "calc(50% - 18px)",
  below: "calc(50% + 18px)",
};

export const PeriodOption = styled.button`
  position: absolute;
  left: 0;
  top: ${({ $position }) => PERIOD_TOP[$position]};
  width: 100%;
  height: 36px;
  border: none;
  cursor: pointer;
  font-size: 13px;

  background: ${({ theme, $active }) => ($active ? theme.color.pointSoft : "transparent")};
  border-top: 1px solid ${({ theme, $active }) => ($active ? theme.color.point : "transparent")};
  border-bottom: 1px solid ${({ theme, $active }) => ($active ? theme.color.point : "transparent")};
  color: ${({ theme, $active }) => ($active ? theme.color.pointDark : theme.color.sub)};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};

  &:disabled {
    color: ${({ theme }) => theme.color.disabled};
    cursor: not-allowed;
  }
`;
