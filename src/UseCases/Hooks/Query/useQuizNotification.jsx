import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  UpdateNotification,
  getNotifications,
  sendNotifications,
  sendNotificationsAll,
} from '../../Apis/notification-apis';

export const useQuizNotification = ( token) => {
  const queryClient = useQueryClient();


  console.log(token)

  const queryData = useQuery({
    queryKey: ['notificationsHistory',token],
    queryFn: () => getNotifications(token),
  });

  const updateNotificationMutation = useMutation({
    mutationFn: (data) => UpdateNotification(token, data),
    onSuccess: () => queryClient.invalidateQueries(),
  });


  const sendNotificationMutation = useMutation({
    mutationFn: sendNotifications,
    queryKey: ['sendNotifications'],

  })


  const sendNotificationsAllMutation = useMutation({
    mutationFn:sendNotificationsAll,
  })

  return { queryData, updateNotificationMutation,sendNotificationMutation ,sendNotificationsAllMutation}; 
};
