var Campground = require("../models/campground");
var Comment   = require("../models/comment");
// all middleware goes here
var middlewareObject = {};
middlewareObject.checkCampgroundOwnership = function(req, res, next){
            if(req.isAuthenticated()){
                    
                     Campground.findById(req.params.id, function(err, foundCampground){
                        if(err || !foundCampground){
                            req.flash("error","Campground not found !!");
                            res.redirect("back");
                        }
                        else{
                            // does the user own this campground?
                            if(foundCampground.author.id.equals(req.user._id)){
                               
                                next();
                            }
                                
                            else{
                                 req.flash("error","You don't have the permission to do that !");
                               res.redirect("back");
                            }
                            
                        }
                    });
               
            }
        else  
          { 
             req.flash("error", "You need to be logged in !!"); 
             res.redirect("back");
           }
    
};

middlewareObject.checkCommentOwnership = function(req, res, next)
        {
                  if(req.isAuthenticated()){
                            
                             Comment.findById(req.params.comment_id, function(err, foundComment){
                                if(err || !foundComment){
                                    req.flash("error","Comment not found!");
                                    res.redirect("back");
                                }
                                else{
                                    // does the user own this comment?
                                    if(foundComment.author.id.equals(req.user._id)){
                                        // res.render("campgrounds/edit", {campground: foundCampground});
                                        next();
                                    }
                                        
                                    else{
                                        req.flash("error","You don't have permission to do that.");
                                       res.redirect("back");
                                    }
                                    
                                }
                            });
                       
                    }
                    else  
                      {
                         req.flash("error","You need to be logged in to do that!!");
                         res.redirect("back");
                       }  
        };
middlewareObject.isLoggedIn = function(req, res, next)
        {
            if(req.isAuthenticated())
                {
                    return next();
                }
                req.flash("error", "PLEASE LOGIN FIRST !!");
                res.redirect("/login");
         };


module.exports = middlewareObject;