import { useEffect, useState, useCallback, useMemo } from 'react';
import './trip.css';
import { domain } from '../../domain.js';

import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTripsAction } from '../../redux/actions/tripAction';
import Search from '../../components/search/Search';
import Spinner from '../../components/spinner/Spinner';

const Trip = () => {
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');
  const { trip, loading } = useSelector((state) => state.getTrips) || {};

  const dispatch = useDispatch();

  const handleTripSearch = useCallback(
    (searchValue) => {
      setSearch(searchValue);
    },
    []
  );

  useEffect(() => {
    dispatch(getTripsAction(search));
  }, [dispatch, search]);

  useEffect(() => {
    if (loading) {
      setLoader(true);
    }
    if (trip && trip.data) {
      setLoader(false);
    }
  }, [trip, loading]);

  const tripList = useMemo(() => {
    if (trip && trip.data) {
      return trip.data.filter((tri) => tri.active);
    }
    return [];
  }, [trip]);

  const totalTrip = tripList.length;

  const formatDate = useCallback(
    (dateString) => {
      if (totalTrip > 0) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      }
    },
    [totalTrip]
  );

  return (
    <Layout title={'trips - Travel'}>
      <div className="tripsMain container-fluid ">
        {loader ? (
          <Spinner />
        ) : (
          <div className="row tripBox  ">
            <div className=" col-md-7 blogTop mt-5">
              <Search handleSearch={handleTripSearch} />

              <div className="addNew">
                <Link to="/create-trip"> Add New</Link>
              </div>
            </div>

            {tripList.map((tri) => (
              <div key={tri._id} className="col-md-7 mt-3   ">
                <div className=" card w-100 p-3 my-2">
                  <Link to={`/trip/${tri._id}`}>
                    <div className="row">
                      <div className="col-md-4 trip">
                        <img
                          src={
                            tri.headerImage
                              ? `${domain}/${tri.headerImage.replace('\\', '/')}`
                              : 'http://localhost:3000/assets/slider/slider1.jpg'
                          }
                          alt=""
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="publisher">
                          <div className="tripTime ">
                            <span style={{ marginRight: '50px' }}>
                              <b>Start Date</b> : {formatDate(tri.startDate)}
                            </span>
                            <span className="endDate">
                              <b>End Date</b> : {formatDate(tri.endDate)}
                            </span>
                          </div>
                        </div>
                        <h2>{tri.destination}</h2>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: tri.notes.split(' ').slice(0, 30).join(' '),
                          }}
                        ></p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="tripLeftLine"></div>
        <div className="tripRightLine"></div>
      </div>
    </Layout>
  );
};

export default Trip;
