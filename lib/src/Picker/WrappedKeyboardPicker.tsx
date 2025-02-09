import * as React from 'react';
import KeyboardDateInput, { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { Picker, ToolbarComponentProps } from './Picker';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import { StateHookOptions } from '../_shared/hooks/usePickerState';
import { DateValidationProps } from '../_helpers/text-field-helper';
import {
  BaseKeyboardPickerProps,
  useKeyboardPickerState,
} from '../_shared/hooks/useKeyboardPickerState';

export type WrappedKeyboardPickerProps = DateValidationProps &
  BaseKeyboardPickerProps &
  ExtendWrapper<KeyboardDateInputProps>;

export interface MakePickerOptions<T> {
  useOptions: (props: any) => StateHookOptions;
  getCustomProps?: (props: T) => Partial<T>;
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

// Mostly duplicate of ./WrappedPurePicker.tsx to enable tree-shaking of keyboard logic
// TODO investigate how to reduce duplications
export function makeKeyboardPicker<T extends any>({
  useOptions,
  getCustomProps,
  DefaultToolbarComponent,
}: MakePickerOptions<WrappedKeyboardPickerProps & T>): React.FC<WrappedKeyboardPickerProps & T> {
  function WrappedKeyboardPicker(props: WrappedKeyboardPickerProps & T) {
    const {
      allowKeyboardControl,
      ampm,
      hideTabs,
      animateYearScrolling,
      autoOk,
      disableFuture,
      disablePast,
      format,
      forwardedRef,
      initialFocusedDate,
      invalidDateMessage,
      labelFunc,
      leftArrowIcon,
      leftArrowButtonProps,
      maxDate,
      maxDateMessage,
      minDate,
      onOpen,
      onClose,
      minDateMessage,
      strictCompareDates,
      minutesStep,
      onAccept,
      onChange,
      onMonthChange,
      onYearChange,
      renderDay,
      views,
      openTo,
      rightArrowIcon,
      rightArrowButtonProps,
      shouldDisableDate,
      value,
      dateRangeIcon,
      emptyLabel,
      invalidLabel,
      timeIcon,
      orientation,
      variant,
      disableToolbar,
      loadingIndicator,
      ToolbarComponent = DefaultToolbarComponent,
      ...other
    } = props;

    const injectedProps = getCustomProps ? getCustomProps(props) : {};

    const options = useOptions(props);
    const { pickerProps, inputProps, wrapperProps } = useKeyboardPickerState(props, options);

    return (
      <Wrapper
        variant={variant}
        InputComponent={KeyboardDateInput}
        DateInputProps={inputProps}
        {...injectedProps}
        {...wrapperProps}
        {...other}
      >
        <Picker
          {...pickerProps}
          ToolbarComponent={ToolbarComponent}
          disableToolbar={disableToolbar}
          hideTabs={hideTabs}
          orientation={orientation}
          ampm={ampm}
          views={views}
          openTo={openTo}
          allowKeyboardControl={allowKeyboardControl}
          minutesStep={minutesStep}
          animateYearScrolling={animateYearScrolling}
          disableFuture={disableFuture}
          disablePast={disablePast}
          leftArrowIcon={leftArrowIcon}
          leftArrowButtonProps={leftArrowButtonProps}
          maxDate={maxDate}
          minDate={minDate}
          strictCompareDates={strictCompareDates}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          renderDay={renderDay}
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          rightArrowIcon={rightArrowIcon}
          rightArrowButtonProps={rightArrowButtonProps}
          shouldDisableDate={shouldDisableDate}
          loadingIndicator={loadingIndicator}
        />
      </Wrapper>
    );
  }

  return WrappedKeyboardPicker;
}
