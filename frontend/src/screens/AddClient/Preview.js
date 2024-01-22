import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Input, Row, Table } from 'reactstrap';
import 'react-calendar/dist/Calendar.css';
import '../../assets/css/common.css';
import '../../assets/css/tooltip.css';
import '../../assets/css/Profile.css';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { SaveClientForm } from "../../API/Client"
import CalenderImg from '../../assets/Profile/Calender.svg';
import { updateClintData } from '../../redux/clientBookingForm';

function Preview() {
  const dispatch = useDispatch()
  const clientData = useSelector((state) => state.clientData);
  const [eventIndex, setEventIndex] = useState(0)
  const submitClient = async () => {
    const user = JSON.parse(localStorage.getItem('loginUser'));
    await SaveClientForm({ ...clientData, userID: user?.data?.User._id })
    dispatch(updateClintData({ albums: [""] }))
    window.notify("Cliend has been Added", "success")
    navigate('/MyProfile/AddClient/Form-I')
  };
  const target = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="mt18">
        <Row>
          <Col xs="6" sm="3" className="pr5">
            <div ref={target}>
              <div>
                <div className="Text16N" style={{ marginBottom: '6px' }}>
                  Event Date
                </div>
                <div
                  className={`forminput R_A_Justify1`}
                  // onClick={toggle}
                  style={{ cursor: 'pointer' }}
                >
                  {clientData?.events && dayjs(clientData?.events[eventIndex]?.eventDate).format('DD-MMM-YYYY')}
                  <img src={CalenderImg} />
                </div>
              </div>
            </div>
          </Col>
          <Col xs="6" sm="3">
            <div>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Event Type
              </div>
              <Input
                type="text"
                name="eventType"
                disabled={true}
                className='forminput'
                value={clientData?.events && clientData?.events[eventIndex]?.eventType}
                required={true}
                // onChange={(e) => updateEventValues(e)}
                placeholder={'Event_Type'}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="4" sm="3" className="pr5 mb-2">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Location
              </div>
              <Input
                type="text"
                name="location"
                disabled={true}
                className='forminput'
                value={clientData?.events && clientData?.events[eventIndex]?.location || ""}
                required={true}
                // onChange={(e) => updateEventValues(e)}
                placeholder={'Location'}
              />
            </div>
          </Col>
          <Col xs="6" sm="3">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Travel By
              </div>
              <Input
                type="text"
                name="travelBy"
                disabled={true}
                className='forminput'
                value={clientData?.events && clientData?.events[eventIndex]?.travelBy}
                required={true}
                // onChange={(e) => updateEventValues(e)}
                placeholder={'Location'}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="4" sm="3" className="pr5">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Photographers
              </div>
              <Input
                type="text"
                name="photographers"
                disabled={true}
                className='forminput'
                value={clientData?.events && clientData?.events[eventIndex]?.photographers}
                required={true}
                // onChange={(e) => updateEventValues(e)}
                placeholder={'Location'}
              />
            </div>
          </Col>
          <Col xs="6" sm="3" className="me-3">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Cinematographers
              </div>
              <Input
                type="text"
                name="cinematoraphers"
                disabled={true}
                className='forminput'
                value={clientData?.events && clientData?.events[eventIndex]?.cinematographers}
                required={true}
                // onChange={(e) => updateEventValues(e)}
                placeholder={'Location'}
              />
            </div>
          </Col>
          <Col xs="6" sm="3">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Drones
              </div>
              <Input
                type="text"
                name="drones"
                disabled={true}
                className='forminput'
                value={ clientData?.events && clientData?.events[eventIndex]?.drones}
                required={true}
                // onChange={(e) => updateEventValues(e)}
                placeholder={'Location'}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="6" sm="3" className="pr5">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Same Day Photo Editor
              </div>
              <Input type="text"
                name="sameDayPhotoEditor"
                disabled={true}
                className='forminput'
                value={clientData?.events && clientData?.events[eventIndex]?.sameDayPhotoEditor}
                required={true}
                // onChange={(e) => updateEventValues(e)}
                placeholder={'Location'}
              />
            </div>
          </Col>
          <Col xs="6" sm="3" className="me-3">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Same Day Video Editor
              </div>
              <Input
                type="text"
                name="sameDayVideoEditor"
                disabled={true}
                className='forminput'
                value={clientData?.events && clientData?.events[eventIndex]?.sameDayVideoEditor}
                required={true}
                // onChange={(e) => updateEventValues(e)}
                placeholder={'Location'}
              />
            </div>
          </Col>
          <Col xs="6" sm="3" className="me-3">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Tentative
              </div>
              <Input
                type="text"
                name="tentative"
                disabled={true}
                className='forminput'
                value={clientData?.events && clientData?.events[eventIndex]?.tentative}
                required={true}
                // onChange={(e) => updateEventValues(e)}
                placeholder={'Location'}
              />
            </div>
          </Col>
        </Row>
        <div className='mt-5'>
          <Table
            bordered
            hover
            striped
            responsive
            style={{ marginTop: '15px', width: '80%' }}
          >
            <thead>
              <tr className="Text14Semi gray3 alignCenter">
                <th></th>
                <th>Event Type</th>
                <th>Date</th>
                <th>Location</th>
                <th>Travel By</th>
              </tr>
            </thead>
            <tbody className="Text14Semi alignCenter">
              {(
                clientData?.events?.map((event, i) => (
                  <tr>
                    <td className="primary2">
                      <div class="form-check">
                        <input
                          style={{ marginLeft: '20px' }}
                          class="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios1"
                          checked={eventIndex === i}
                          onChange={(e) => setEventIndex(i)}
                        />
                      </div>
                    </td>
                    <td>{i + 1} ) {event.eventType}</td>
                    <td className="primary2">{dayjs(event.eventDate).format('DD-MMM-YYYY')}</td>
                    <td className="primary2">{event.location}</td>
                    <td className="primary2">{event.travelBy}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        <div className='mt25'>
          <div className="Text16N" style={{ marginBottom: "6px" }}>
            Deliverables
          </div>
          <div className="Text16N">
            <input type="checkbox"
              name="preWeddingPhotos"
              checked={clientData?.deliverables?.preWeddingPhotos}
              disabled={true}
            />
            {"   "}
            Pre Wedding Photos
            <input
              type="checkbox"
              name="preWeddingVideos"
              style={{ marginLeft: "20px" }}
              checked={clientData?.deliverables?.preWeddingVideos}
              disabled={true}
            />
            {"   "}
            Pre Wedding Videos
            <input
              type="checkbox"
              name="photos"
              style={{ marginLeft: "20px" }}
              checked={clientData?.deliverables?.photos}
              disabled={true}
            />
            {"   "}
            Photos
          </div>
        </div>
        <Row>
          {clientData?.albums?.map((albumValue, i) => {
            return (
              <Col className='mx-2' xs="4" sm="3" lg='4' key={i}>
                <div className="Drop">
                  <h4 className="LabelDrop">Album_ {i + 1}</h4>
                  <Input
                    type="text"
                    name="album"
                    disabled={true}
                    className='forminput'
                    value={albumValue}
                    required={true}
                  // onChange={(e) => updateEventValues(e)}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col xs="4" sm="2" className="me-3">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Promo
              </div>
              <Input
                type="text"
                name="promo"
                disabled={true}
                className='forminput'
                value={clientData?.promos}
                required={true}
              // onChange={(e) => updateEventValues(e)}
              />
            </div>
          </Col>
          <Col xs="6" sm="2" className="me-3">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Long Film
              </div>
              <Input
                type="text"
                name="longFilms"
                disabled={true}
                className='forminput'
                value={clientData?.longFilms}
                required={true}
              // onChange={(e) => updateEventValues(e)}
              />
            </div>
          </Col>
          <Col xs="4" sm="2" className="me-3">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Promo
              </div>
              <Input
                type="text"
                name="reels"
                disabled={true}
                className='forminput'
                value={clientData?.reels}
                required={true}
              // onChange={(e) => updateEventValues(e)}
              />
            </div>
          </Col>
          <Col xs="3" sm="2" className="me-3">
            <div className='mt25'>
              <div className="Text16N" style={{ marginBottom: '6px' }}>
                Hard Drives
              </div>
              <Input
                type="text"
                name="hardDrives"
                disabled={true}
                className='forminput'
                value={clientData?.hardDrives}
                required={true}
              // onChange={(e) => updateEventValues(e)}
              />
            </div>
          </Col>
        </Row>
        <div className='mt25'>
          <div className="Text16N" style={{ marginBottom: '6px' }}>
            Client Suggestion
          </div>
          <Input
            type="text"
            name="suggestion"
            disabled={true}
            className='forminput h100 alignTop'
            value={clientData?.suggestion || ""}
            required={false}
            // onChange={(e) => dispatch(updateClintData({ ...clientData, [e.target.name]: e.target.value }))}
            placeholder={'Client_Suggestion'}
          />
        </div>
        <Row className="centerAlign">
          <Col xs="3" sm="2" className="me-3">
            <div className="centerAlign mt40 mb15">
              <Button className="submit_btn submit" onClick={() => navigate('/MyProfile/AddClient/Form-II')}>
                Edit
              </Button>
            </div>
          </Col>
          <Col xs="3" sm="2" className="me-3">
            <div className="centerAlign mt40 mb15">
              <Button className="submit_btn submit" onClick={submitClient}>
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      {/* <Overlay
        rootClose={true}
        onHide={() => setShow(false)}
        target={target.current}
        show={show}
        placement="bottom"
      >
        {(props) => (
          <Tooltip id="overlay-example" bsPrefix="tooltipBg" {...props}>
            <div style={{ width: '300px' }} className="tooltipBg">
              <Calendar onChange={setDate} value={date} />
            </div>
          </Tooltip>
        )}
      </Overlay> */}
    </>
  );
}

export default Preview;