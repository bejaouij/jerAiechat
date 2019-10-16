module.exports = {
  GET : {
      '/' : {
          controller : 'IndexController',
          method : 'index'
      },
      '/rooms' : {
          controller : 'RoomController',
          method : 'rooms'
      },
      '/rooms/' : {
          controller : 'RoomController',
          method : 'rooms'
      },
      '/rooms/messages' : {
          controller : 'RoomController',
          method : 'messages'
      },
      '/rooms/messages/' : {
          controller : 'RoomController',
          method : 'messages'
      },
      '/rooms/messages_by_packet' : {
          controller : 'RoomController',
          method : 'messagesByPacket'
      },
      '/rooms/messages_by_packet/' : {
          controller : 'RoomController',
          method : 'messagesByPacket'
      }
  }
};
