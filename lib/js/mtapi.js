// Copyright 2010, MediaTemple, Inc.

var mtapi_client_version = "0.1a";

// global
var mtapi_baseurl = 'https://api.mediatemple.net';
var mtapi_apiuri = '/api/v1';
var mtapi_apikey;
var mtapi_request_type = 'json';
var mtapi_request_timeout = 30000;
var mtapi_wrap_root = false;
var mtapi_pretty_print = false;
var DEBUG = false;

// service uris
var mtapi_services_uri = '/services'
var mtapi_service_ids_uri = '/services/ids'
var mtapi_service_uri = '/services/'
var mtapi_service_reboot_uri = '/services/{id}/reboot'
var mtapi_service_rootpw_uri = '/services/{id}/rootPassword'
var mtapi_service_pleskpw_uri = '/services/{id}/pleskPassword'
var mtapi_service_temp_disk_uri = '/services/{id}/disk/temp'
var mtapi_service_flush_firewall_uri = '/services/{id}/firewall/flush'

// stats
var mtapi_stats_base_uri = '/stats'
var mtapi_stats_warnings_uri = mtapi_stats_base_uri + "/warnings"
var mtapi_stats_warnings_thresholds_uri = mtapi_stats_base_uri + "/warnings/thresholds"
var mtapi_stats_5min_uri = mtapi_stats_base_uri + "/5min"
var mtapi_stats_15min_uri = mtapi_stats_base_uri + "/15min"
var mtapi_stats_30min_uri = mtapi_stats_base_uri + "/30min"
var mtapi_stats_1hour_uri = mtapi_stats_base_uri + "/1hour"

function MTAPI(apikey) {
    if (DEBUG == 1) {
        console.log("MTAPI(): using baseurl "+mtapi_baseurl);
    }
    
    mtapi_apikey = apikey;

    // Setting Base Url
    this.setBaseUrl = mtapi_setBaseUrl

    this.getServices = mtapi_getServices;
    this.getServiceIds = mtapi_getServiceIds;
    this.getService = mtapi_getService;

    this.rebootService = mtapi_rebootService;
    this.addTempDiskSpace = mtapi_addTempDiskSpace;
    this.flushFirewall = mtapi_flushFirewall;
    this.setRootPassword = mtapi_setRootPassword;
    this.setPleskPassword = mtapi_setPleskPassword;

    this.getCurrentStats = mtapi_getCurrentStats;
    this.getRangeStats = mtapi_getRangeStats;
    this.get5MinStats = mtapi_get5MinStats;
    this.get15MinStats = mtapi_get15MinStats;
    this.get30MinStats = mtapi_get30MinStats;
    this.get1HourStats = mtapi_get1HourStats;

    this.getWarnings = mtapi_getWarnings;
    this.getWarningThresholds = mtapi_getWarningThresholds;
}

function buildAPIQuery(uri) {
    var myURL = mtapi_baseurl + mtapi_apiuri + uri;
    myURL += '?apikey=' + mtapi_apikey;
    myURL += '&prettyPrint=' + mtapi_pretty_print;
    myURL += '&wrapRoot=' + mtapi_wrap_root;
    return myURL;
}

function mtapi_setBaseUrl(baseurl) {
    if (!isEmpty(baseurl)) {
        mtapi_baseurl = baseurl;
        if (DEBUG == 1) {
            console.log("MTAPI(): using baseurl "+mtapi_baseurl);
        }
    } else {
        throw Error("MTAPI requires a valid base URL - you cannot specify an empty one (current=" + mtapi_baseurl + ")");
    }
}

function mtapi_getServiceIds(success, failure) {
  try {
    var url = buildAPIQuery(mtapi_service_ids_uri);
    if (DEBUG == 1) {
        console.log("mtapi_getServiceIds(): requesting service ids from "+url);
    }

    $.ajax({
      url: url,
      async: true,
      cache: false,
      dataType: mtapi_request_type,
      timeout: mtapi_request_timeout,
      success: function(json, statusText, request) {
        if (DEBUG == 1) {
            console.log("mtapi_getServiceIds(): current: "+$.dump(json)+"\n");
        }
        if (isDefined(success)) {
            if (DEBUG == 1) {
                console.log("mtapi_getServiceIds(): executing success callback");
            }
            success(json);
        }
      },
      error: function(request, textStatus, errorThrown) {
        //alert("error: "+textStatus+" errorThrown: "+errorThrown+" response: "+request.responseText);
        if (DEBUG == 1) {
            console.log("mtapi_getServiceIds(): response = "+request.responseText+", error: "+errorThrown+"\n");
        }
        if (isDefined(failure)) {
            if (DEBUG == 1) {
                console.log("mtapi_getServiceIds(): executing failure callback");
            }
            try {
                var response = $.parseJSON(request.responseText);
                failure(response);
            } catch (ex) {
                // just pass the response text back since we couldn't get a json response object
                failure(request.responseText);
            }
        }
      }
    });
  } catch (err) {
    try {
        if (DEBUG == 1) {
            console.log("mtapi_getServiceIds(): error: "+err);
        }
    } catch (err2) { }
  }
}

function mtapi_getServices(success, failure) {
  try {
    var url = buildAPIQuery(mtapi_services_uri);
    if (DEBUG == 1) {
        console.log("mtapi_getServices(): requesting services from "+url);
    }

    $.ajax({
      url: url,
      async: true,
      cache: false,
      dataType: mtapi_request_type,
      timeout: mtapi_request_timeout,
      success: function(json, statusText, request) {
        if (DEBUG == 1) {
            console.log("mtapi_getServices(): current: "+$.dump(json)+"\n");
        }
        if (isDefined(success)) {
            if (DEBUG == 1) {
                console.log("mtapi_getServices(): executing success callback");
            }
            success(json);
        }
      },
      error: function(request, textStatus, errorThrown) {
        //alert("error: "+textStatus+" errorThrown: "+errorThrown+" response: "+request.responseText);
        if (DEBUG == 1) {
            console.log("mtapi_getServices(): response = "+request.responseText+", error: "+errorThrown+"\n");
        }
        if (isDefined(failure)) {
            if (DEBUG == 1) {
                console.log("mtapi_getServices(): executing failure callback");
            }
            try {
                var response = $.parseJSON(request.responseText);
                failure(response);
            } catch (ex) {
                // just pass the response text back since we couldn't get a json response object
                failure(request.responseText);
            }
        }
      }
    });
  } catch (err) {
    try {
        if (DEBUG == 1) {
            console.log("mtapi_getServices(): error: "+err);
        }
    } catch (err2) { }
  }
}

function isDefined(x) {
   return !isUndefined(x);
}

function mtapi_getService(id, success, failure) {
  try {
    var url = buildAPIQuery(mtapi_service_uri+id);
    if (DEBUG == 1) {
        console.log("mtapi_getService(): requesting service from "+url);
    }

    $.ajax({
      url: url,
      async: true,
      cache: false,
      dataType: mtapi_request_type,
      timeout: mtapi_request_timeout,
      success: function(json, statusText, request) {
        if (DEBUG == 1) {
            console.log("mtapi_getService(): current: "+$.dump(json)+"\n");
        }
        if (isDefined(success)) {
            if (DEBUG == 1) {
                console.log("mtapi_getService(): executing success callback");
            }
            success(json);
        }
      },
      error: function(request, textStatus, errorThrown) {
        //alert("error: "+textStatus+" errorThrown: "+errorThrown+" response: "+request.responseText);
        if (DEBUG == 1) {
            console.log("mtapi_getService(): response = "+request.responseText+", error: "+errorThrown+"\n");
        }
        if (isDefined(failure)) {
            if (DEBUG == 1) {
                console.log("mtapi_getService(): executing failure callback");
            }
            try {
                var response = $.parseJSON(request.responseText);
                failure(response);
            } catch (ex) {
                // just pass the response text back since we couldn't get a json response object
                failure(request.responseText);
            }
        }
      }
    });
  } catch (err) {
    try {
        if (DEBUG == 1) {
            console.log("mtapi_getService(): error: "+err);
        }
    } catch (err2) { }
  }
}

function mtapi_getCurrentStats(id, success, failure) {
    if (DEBUG == 1) {
        console.log("mtapi_getCurrentStats(): requesting current stats");
    }
    getStats(id, null, null, null, success, failure);
}

function mtapi_getRangeStats(id, start, end, success, failure) {
    if (DEBUG == 1) {
        console.log("mtapi_getRangeStats(): requesting range stats");
    }
    getStats(id, start, end, null, success, failure);
}

function mtapi_get5MinStats(id, success, failure) {
    getStats(id, null, null, "5min", success, failure);
}

function mtapi_get15MinStats(id, success, failure) {
    getStats(id, null, null, "15min", success, failure);
}

function mtapi_get30MinStats(id, success, failure) {
    getStats(id, null, null, "30min", success, failure);
}

function mtapi_get1HourStats(id, success, failure) {
    getStats(id, null, null, "1hour", success, failure);
}

function getStats(id, start, end, predefined, success, failure) {
  try {
    if (isEmpty(id) || id == '') {
        if (isDefined(failure)) {
            if (DEBUG == 1) {
                console.log("getStats(): executing failure callback");
            }

            failure("A valid service id must be specified");
            return;
        }
    }
    var uri = mtapi_stats_base_uri+"/"+id;
    if (!isEmpty(predefined)) {
        uri += "/"+predefined;
    }
    var url = buildAPIQuery(uri);
    if (DEBUG == 1) {
        console.log("getStats(): requesting stats from "+url);
    }

    if (!isEmpty(start)) {
        url += "&start="+start;
    }
    if (!isEmpty(end)) {
        url += "&end="+end;
    }

    $.ajax({
      url: url,
      async: true,
      cache: false,
      dataType: mtapi_request_type,
      timeout: mtapi_request_timeout,
      success: function(json, statusText, request) {
        if (DEBUG == 1) {
            console.log("getStats(): current: "+$.dump(json)+"\n");
        }
        if (isDefined(success)) {
            if (DEBUG == 1) {
                console.log("getStats(): executing success callback");
            }
            success(json);
        }
      },
      error: function(request, textStatus, errorThrown) {
        //alert("error: "+textStatus+" errorThrown: "+errorThrown+" response: "+request.responseText);
        if (DEBUG == 1) {
            console.log("getStats(): response = "+request.responseText+", error: "+errorThrown+"\n");
        }
        if (isDefined(failure)) {
            if (DEBUG == 1) {
                console.log("getStats(): executing failure callback");
            }
            try {
                var response = $.parseJSON(request.responseText);
                failure(response);
            } catch (ex) {
                // just pass the response text back since we couldn't get a json response object
                failure(request.responseText);
            }
        }
      }
    });
  } catch (err) {
    try {
        if (DEBUG == 1) {
            console.log("getStats(): error: "+err);
        }
    } catch (err2) { }
  }
}

function mtapi_getWarnings(success, failure) {
  try {
    var uri = mtapi_stats_warnings_uri;
    var url = buildAPIQuery(uri);
    if (DEBUG == 1) {
        console.log("mtapi_getWarnings(): requesting warnings from "+url);
    }

    $.ajax({
      url: url,
      async: true,
      cache: false,
      dataType: mtapi_request_type,
      timeout: mtapi_request_timeout,
      success: function(json, statusText, request) {
        if (DEBUG == 1) {
            console.log("mtapi_getWarnings(): current: "+$.dump(json)+"\n");
        }
        if (isDefined(success)) {
            if (DEBUG == 1) {
                console.log("mtapi_getWarnings(): executing success callback");
            }
            success(json);
        }
      },
      error: function(request, textStatus, errorThrown) {
        //alert("error: "+textStatus+" errorThrown: "+errorThrown+" response: "+request.responseText);
        if (DEBUG == 1) {
            console.log("mtapi_getWarnings(): response = "+request.responseText+", error: "+errorThrown+"\n");
        }
        if (isDefined(failure)) {
            if (DEBUG == 1) {
                console.log("mtapi_getWarnings(): executing failure callback");
            }
            try {
                var response = $.parseJSON(request.responseText);
                failure(response);
            } catch (ex) {
                // just pass the response text back since we couldn't get a json response object
                failure(request.responseText);
            }
        }
      }
    });
  } catch (err) {
    try {
        if (DEBUG == 1) {
            console.log("mtapi_getWarnings(): error: "+err);
        }
    } catch (err2) { }
  }
}

function mtapi_getWarningThresholds(success, failure) {
  try {
    var uri = mtapi_stats_warnings_thresholds_uri;
    var url = buildAPIQuery(uri);
    if (DEBUG == 1) {
        console.log("mtapi_getWarningThresholds(): requesting warning thresholds from "+url);
    }

    $.ajax({
      url: url,
      async: true,
      cache: false,
      dataType: mtapi_request_type,
      timeout: mtapi_request_timeout,
      success: function(json, statusText, request) {
        if (DEBUG == 1) {
            console.log("mtapi_getWarningThresholds(): current: "+$.dump(json)+"\n");
        }
        if (isDefined(success)) {
            if (DEBUG == 1) {
                console.log("mtapi_getWarningThresholds(): executing success callback");
            }
            success(json);
        }
      },
      error: function(request, textStatus, errorThrown) {
        //alert("error: "+textStatus+" errorThrown: "+errorThrown+" response: "+request.responseText);
        if (DEBUG == 1) {
            console.log("mtapi_getWarningThresholds(): response = "+request.responseText+", error: "+errorThrown+"\n");
        }
        if (isDefined(failure)) {
            if (DEBUG == 1) {
                console.log("mtapi_getWarningThresholds(): executing failure callback");
            }
            try {
                var response = $.parseJSON(request.responseText);
                failure(response);
            } catch (ex) {
                // just pass the response text back since we couldn't get a json response object
                failure(request.responseText);
            }
        }
      }
    });
  } catch (err) {
    try {
        if (DEBUG == 1) {
            console.log("mtapi_getWarningThresholds(): error: "+err);
        }
    } catch (err2) { }
  }
}

function mtapi_rebootService(id, success, failure) {
    if (DEBUG == 1) {
        console.log("mtapi_rebootService(): requesting reboot");
    }
    makeServiceRequest("POST", mtapi_service_reboot_uri, id, null, success, failure);
}

function mtapi_addTempDiskSpace(id, success, failure) {
    if (DEBUG == 1) {
        console.log("mtapi_rebootService(): adding temp disk space");
    }
    makeServiceRequest("POST", mtapi_service_temp_disk_uri, id, null, success, failure);
}

function mtapi_flushFirewall(id, success, failure) {
    if (DEBUG == 1) {
        console.log("mtapi_rebootService(): flushing firewall");
    }
    makeServiceRequest("POST", mtapi_service_flush_firewall_uri, id, null, success, failure);
}

function mtapi_setRootPassword(id, password, success, failure) {
    if (DEBUG == 1) {
        console.log("mtapi_setRootPassword(): setting root password");
    }
    var data = '{"password": "' + password.replace(/"/, '\\"') + '"}';
    makeServiceRequest("PUT", mtapi_service_rootpw_uri, id, data, success, failure);
}

function mtapi_setPleskPassword(id, password, success, failure) {
    if (DEBUG == 1) {
        console.log("mtapi_setPleskPassword(): setting plesk password");
    }
    var data = '{"password": "' + password.replace(/"/, '\\"') + '"}';
    makeServiceRequest("PUT", mtapi_service_pleskpw_uri, id, data, success, failure);
}

function makeServiceRequest(type, serviceURI, id, data, success, failure) {
  try {
    var uri = serviceURI.replace(/{id}/, id);
    var url = buildAPIQuery(uri);
    if (DEBUG == 1) {
        console.log("makeServiceRequest(): making service request to "+url);
    }

    $.ajax({
      type: type,
      url: url,
      data: data,
      async: true,
      cache: false,
      dataType: mtapi_request_type,
      contentType: (mtapi_request_type=="xml") ? "application/xml" : "application/json",
      timeout: mtapi_request_timeout,
      success: function(json, statusText, request) {
        if (DEBUG == 1) {
            console.log("makeServiceRequest(): data="+json+", status="+statusText+"\n");
        }
        if (isDefined(success)) {
            if (DEBUG == 1) {
                console.log("makeServiceRequest(): executing success callback");
            }
            success(json);
        }
      },
      error: function(request, textStatus, errorThrown) {
        //alert("error: "+textStatus+" errorThrown: "+errorThrown+" response: "+request.responseText);
        if (DEBUG == 1) {
            console.log("makeServiceRequest(): status: "+textStatus+", response: "+request.responseText+", error: "+errorThrown+"\n");
        }
        if (isDefined(failure)) {
            if (DEBUG == 1) {
                console.log("makeServiceRequest(): executing failure callback");
            }
            try {
                var response = $.parseJSON(request.responseText);
                failure(response);
            } catch (ex) {
                // just pass the response text back since we couldn't get a json response object
                failure(request.responseText);
            }
        }
      }
    });
  } catch (err) {
    try {
        if (DEBUG == 1) {
            console.log("makeServiceRequest(): error: "+err);
        }
    } catch (err2) { }
  }
}

function isDefined(x) {
   return !isUndefined(x);
}

function isUndefined(x) {
   return x == null && x !== null;
}

function isNull(x) {
   return x == null;
}

function isEmpty(x) {
   return isNull(x) || isUndefined(x);
}
