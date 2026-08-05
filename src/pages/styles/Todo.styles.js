import styled from "styled-components";
import { Link } from "react-router-dom";

export const Main = styled.main`
  max-width: 640px;
  margin: 40px auto;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const PageTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.color.text};
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
`;

export const FilterButton = styled.button`
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.color.point : theme.color.border)};
  background: ${({ theme, $active }) => ($active ? theme.color.pointSoft : "#fff")};
  color: ${({ theme, $active }) => ($active ? theme.color.pointDark : theme.color.sub)};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.color.point};
  }
`;

export const TodoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TodoItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 14px 16px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  cursor: pointer;

  ${({ $done, theme }) =>
    $done &&
    `
      background: ${theme.color.bgSoft};
    `}
`;

export const TodoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TodoExpanded = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  cursor: default;
`;

export const TodoActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
  accent-color: ${({ theme }) => theme.color.point};
  cursor: pointer;
  flex-shrink: 0;
`;

export const TodoTitle = styled.span`
  flex: 1;
  min-width: 0;
  font-size: 15px;
  color: ${({ theme }) => theme.color.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ $done, theme }) =>
    $done &&
    `
      text-decoration: line-through;
      color: ${theme.color.sub};
    `}
`;

export const TodoMemo = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.sub};
  white-space: pre-wrap;
`;

export const TimeRange = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  background: ${({ theme, $overdue }) => ($overdue ? theme.color.dangerSoft : theme.color.bgSoft)};
  color: ${({ theme, $overdue }) => ($overdue ? theme.color.danger : theme.color.sub)};
`;

export const GhostAddRow = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 1.5px dashed ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.sub};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color.point};
    color: ${({ theme }) => theme.color.point};
    background: ${({ theme }) => theme.color.pointSoft};
  }
`;

export const Badge = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.color.pointSoft};
  color: ${({ theme }) => theme.color.pointDark};
  white-space: nowrap;
`;

export const PostponedBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px dashed ${({ theme }) => theme.color.border};
  color: ${({ theme }) => theme.color.sub};
  white-space: nowrap;
`;

export const IconButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fff;
  font-size: 13px;
  color: ${({ theme }) => theme.color.sub};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.color.point};
    color: ${({ theme }) => theme.color.point};
  }
`;

export const EditLink = styled(Link)`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fff;
  font-size: 13px;
  color: ${({ theme }) => theme.color.sub};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.color.point};
    color: ${({ theme }) => theme.color.point};
  }
`;

export const DeleteButton = styled(IconButton)`
  &:hover {
    border-color: ${({ theme }) => theme.color.danger};
    color: ${({ theme }) => theme.color.danger};
    background: ${({ theme }) => theme.color.dangerSoft};
  }
`;

export const CarryButton = styled(IconButton)`
  border-color: ${({ theme }) => theme.color.point};
  color: ${({ theme }) => theme.color.point};

  &:hover {
    background: ${({ theme }) => theme.color.pointSoft};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.color.disabled};
    color: ${({ theme }) => theme.color.disabled};
    cursor: not-allowed;
    background: #fff;
  }
`;

export const EmptyText = styled.p`
  padding: 40px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.sub};
  font-size: 14px;
`;

export const StatusText = styled.p`
  padding: 20px 0;
  color: ${({ theme }) => theme.color.sub};
  font-size: 14px;
`;

export const DateSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

export const DateInput = styled.input`
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.inputBg};
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.point};
  }
`;

export const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fff;
  color: ${({ theme }) => theme.color.sub};
  font-size: 16px;
  line-height: 1;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.color.point};
    color: ${({ theme }) => theme.color.point};
  }

  &:disabled {
    color: ${({ theme }) => theme.color.disabled};
    cursor: not-allowed;
  }
`;

export const BacklogGroup = styled.div`
  margin-bottom: 22px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DividerLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 10px;
  color: ${({ theme }) => theme.color.sub};
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.color.border};
  }
`;

/* --- Todo Form --- */

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #fff;
  padding: 28px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

export const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.sub};
`;

export const InputBox = styled.input`
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.inputBg};
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
  box-sizing: border-box;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.color.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.point};
  }
`;

export const TextAreaBox = styled.textarea`
  min-height: 88px;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.inputBg};
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
  box-sizing: border-box;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.color.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.point};
  }
`;

export const HintText = styled.p`
  margin: 0;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.bgSoft};
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.sub};
`;

export const ErrorText = styled.p`
  margin: -8px 0 0;
  font-size: 12.5px;
  color: ${({ theme }) => theme.color.danger};
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
`;

export const CancelButton = styled.button`
  height: 44px;
  padding: 0 20px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.bgSoft};
  }
`;

export const SaveButton = styled.button`
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.point};
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.pointHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.color.disabled};
    cursor: not-allowed;
  }
`;
