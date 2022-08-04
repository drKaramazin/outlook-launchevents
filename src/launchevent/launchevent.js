/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

function onMessageComposeHandler(event) {
  setSubject(event);
}
function onAppointmentComposeHandler(event) {
  setSubject(event);
}
function setSubject(event) {
  Office.context.mailbox.item.subject.setAsync(
    "Set by an event-based add-in!",
    {
      asyncContext: event,
    },
    function (asyncResult) {
      // Handle success or error.
      if (asyncResult.status !== Office.AsyncResultStatus.Succeeded) {
        console.error("Failed to set subject: " + JSON.stringify(asyncResult.error));
      }

      // Call event.completed() after all work is done.
      asyncResult.asyncContext.completed();
    }
  );
}

// 1st parameter: FunctionName of LaunchEvent in the manifest; 2nd parameter: Its implementation in this .js file.
Office.actions.associate("onMessageComposeHandler", onMessageComposeHandler);
Office.actions.associate("onAppointmentComposeHandler", onAppointmentComposeHandler);
