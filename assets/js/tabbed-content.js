/* ==========================================================================
   Tabbed content support (added by josh-wong)
   ========================================================================== */
function openTab(evt, tabName, setName) {    
  var i, tabcontent, tablinks;

  var set = document.getElementById(setName);

  // Clear the previously selected tab.
  tabcontent = set.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  // Set the tab to "active".
  tablinks = set.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Display the selected tab and set it to active.
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it.
document.getElementById("defaultOpen-1").click();
document.getElementById("defaultOpen-2").click();
document.getElementById("defaultOpen-3").click();
document.getElementById("defaultOpen-4").click();
document.getElementById("defaultOpen-5").click();
document.getElementById("defaultOpen-6").click();
document.getElementById("defaultOpen-7").click();
document.getElementById("defaultOpen-8").click();
document.getElementById("defaultOpen-9").click();
document.getElementById("defaultOpen-10").click();

// The following method allows for tabs to be clicked and for those tabs to be clicked throughout the page but only if they are the named the same.
// function openTab(evt, tabName) {
//   var i, tabcontent, tablinks;
//   tabcontent = document.getElementsByClassName("tabcontent");
//   for (var i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].classList.remove('show');
//   }
//   tablinks = document.getElementsByClassName("tablinks");
//   for (var i = 0; i < tablinks.length; i++) {
//     tablinks[i].classList.remove('active');
//   }
//   document.getElementsByClassName(tabName)[0].classList.add('show');
//   document.getElementsByClassName(tabName)[1].classList.add('show');
//   var currentTabClass = evt.currentTarget.className.split(" ")[1];
//   console.log(currentTabClass);
//   document.getElementsByClassName(currentTabClass)[0].classList.add('active');
//   document.getElementsByClassName(currentTabClass)[1].classList.add('active');
// }

// // Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();


// The following method allows for multiple tab sections but doesn't highlight the tab button.
// document
//   .querySelectorAll('button.tablinks')
//   .forEach(node => node.addEventListener('click', showTab));

// function showTab(event) {
//   const targetTabId = event.target.getAttribute('data-target');
//   const targetTab = document.getElementById(targetTabId);
  
//   const targetTabSet = targetTab.getAttribute('data-set');
//   const tabSetGroup = document
//     .querySelectorAll(`div[data-set="${targetTabSet}"]`);
  
//   // hide all tabs in the same wrapper as target
//   tabSetGroup.forEach(tab => tab.style.display = 'none');
//   // show only target
//   targetTab.style.display = '';
//  }

// The following is the previous method that only allows for one set of tabs per page.
// function openTab(evt, tabName, tabId) {
//   var i, tabcontent, tablinks;

//   var tab = document.getElementById(tabId)

//   // Clear the previously selected tab.
//   tabcontent = tab.getElementsByClassName("tabcontent");
//   for (i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//   }

//   // Set the tab to "active".
//   tablinks = tab.getElementsByClassName("tabName");
//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }
  
//   // Display the selected tab and set it to active.
//   document.getElementById(tabName).style.display = "block";
//   evt.currentTarget.className += " active";
// }

// // Get the element with id="defaultOpen" and click on it.
// document.getElementById("defaultOpen-1").click();
// document.getElementById("defaultOpen-2").click();
// document.getElementById("defaultOpen-3").click();
// document.getElementById("defaultOpen-4").click();
// document.getElementById("defaultOpen-5").click();
