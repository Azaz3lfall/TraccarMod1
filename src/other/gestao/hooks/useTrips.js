import { useState, useCallback } from 'react';
import { createTrip, updateTrip, deleteTrip } from '../utils/apiUtils';

// Hook para gerenciar operações de viagens
export const useTrips = (openTrips, setOpenTrips, closedTrips, setClosedTrips) => {
  const [newTrip, setNewTrip] = useState({ 
    vehicle_id: '', 
    start_city: '', 
    end_city: '', 
    is_round_trip: false, 
    driver_id: '' 
  });
  
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [finishTripDialogOpen, setFinishTripDialogOpen] = useState(false);
  const [cancelTripDialogOpen, setCancelTripDialogOpen] = useState(false);
  const [distanciaFinal, setDistanciaFinal] = useState('');

  const handleStartTrip = useCallback(async (e) => {
    e.preventDefault();
    try {
      const tripData = await createTrip(newTrip);
      setOpenTrips(prev => [...prev, tripData]);
      setNewTrip({ vehicle_id: '', start_city: '', end_city: '', is_round_trip: false, driver_id: '' });
    } catch (error) {
      console.error('Erro ao iniciar viagem:', error);
    }
  }, [newTrip, setOpenTrips]);

  const handleOpenFinishDialog = useCallback((trip) => {
    setSelectedTrip(trip);
    setFinishTripDialogOpen(true);
  }, []);

  const handleCloseFinishDialog = useCallback(() => {
    setFinishTripDialogOpen(false);
    setSelectedTrip(null);
    setDistanciaFinal('');
  }, []);

  const handleFinishTrip = useCallback(async () => {
    if (!selectedTrip || !distanciaFinal) return;
    
    try {
      const updatedTrip = await updateTrip(selectedTrip.id, {
        ...selectedTrip,
        end_date: new Date().toISOString(),
        distance: parseFloat(distanciaFinal)
      });
      
      setOpenTrips(prev => prev.filter(trip => trip.id !== selectedTrip.id));
      setClosedTrips(prev => [...prev, updatedTrip]);
      handleCloseFinishDialog();
    } catch (error) {
      console.error('Erro ao finalizar viagem:', error);
    }
  }, [selectedTrip, distanciaFinal, setOpenTrips, setClosedTrips, handleCloseFinishDialog]);

  const handleOpenCancelDialog = useCallback((trip) => {
    setSelectedTrip(trip);
    setCancelTripDialogOpen(true);
  }, []);

  const handleCloseCancelDialog = useCallback(() => {
    setCancelTripDialogOpen(false);
    setSelectedTrip(null);
  }, []);

  const handleCancelTrip = useCallback(async () => {
    if (!selectedTrip) return;
    
    try {
      await deleteTrip(selectedTrip.id);
      setOpenTrips(prev => prev.filter(trip => trip.id !== selectedTrip.id));
      handleCloseCancelDialog();
    } catch (error) {
      console.error('Erro ao cancelar viagem:', error);
    }
  }, [selectedTrip, setOpenTrips, handleCloseCancelDialog]);

  return {
    newTrip,
    setNewTrip,
    selectedTrip,
    finishTripDialogOpen,
    cancelTripDialogOpen,
    distanciaFinal,
    setDistanciaFinal,
    handleStartTrip,
    handleOpenFinishDialog,
    handleCloseFinishDialog,
    handleFinishTrip,
    handleOpenCancelDialog,
    handleCloseCancelDialog,
    handleCancelTrip
  };
};
