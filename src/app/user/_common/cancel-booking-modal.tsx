import { BookingType } from "@/interfaces";
import React from "react";
import { Modal, message } from "antd";
import { CancelBooking } from "@/server-actions/bookings";

const CancelBookingModal = ({
  booking,
  showCancelBookingModal,
  setShowCancelBookingModal,
}: {
  booking: BookingType;
  showCancelBookingModal: boolean;
  setShowCancelBookingModal: (show: boolean) => void;
}) => {
  const [loading, setLoading] = React.useState(false);
  const onCancelBooking = async () => {
    try {
      setLoading(true);
      const response = await CancelBooking({
        bookingId: booking._id,
        paymentId: booking.paymentId,
      });
      if (response.success) {
        setShowCancelBookingModal(false);
        message.success(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Cancel Booking"
      open={showCancelBookingModal}
      onCancel={() => setShowCancelBookingModal(false)}
      okText="Yes Cancel"
      centered
      onOk={onCancelBooking}
      okButtonProps={{ loading }}
    >
      <div className="text-sm text-gray-600 mb-7">
        <div className="flex justify-between text-sm">
          <span>Check In</span>
          <span>{booking.checkInDate}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Check Out</span>
          <span>{booking.checkOutDate}</span>
        </div>
      </div>
      <span className="text-gray-700 font-bold text-sm pt-5">
        Are you sure ,You want to cancel?. This action cannot be undone.
      </span>
    </Modal>
  );
};

export default CancelBookingModal;
