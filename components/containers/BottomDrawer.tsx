import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

export type BottomDrawerRef = {
  open: () => void;
  close: () => void;
};

type BottomDrawerProps = {
  onChange?: (isOpen: boolean) => void;
  children?: React.ReactNode;
};

const BottomDrawer = forwardRef<BottomDrawerRef, BottomDrawerProps>(
  ({ onChange, children }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);


    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.snapToIndex(0);
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
    }));

    const handleSheetChange = (index: number) => {
      if (onChange) {
        onChange(index !== -1);
      }
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        onChange={handleSheetChange}
        backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
        )}
      >
        <BottomSheetView
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

BottomDrawer.displayName = 'BottomDrawer';

export default BottomDrawer;
