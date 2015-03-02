<?php
// $Id$
/**
 * @file
 * Title        : NodequeuePager Helper Class
 * Created      : 2010.02.15
 * Author       : Jerod Fritz (jerod@centogram.com) - Centogram Development
 * Adaptation   : litwol (http://drupalbin.com/9359).  Rewritten to use core nodequeue functions and wrapped in module for block placement
 * Description  : Helper class to retrieve prev and next node ids from nodequeue
 */

class NodequeuePager {
  public $sqid;
  public $wrap;
  public $nodes_in_queue = array();
  public $positions = array();
  public function __construct($sqid, $wrap = TRUE) {
    $this->sqid = $sqid;
    $this->wrap = $wrap;
    foreach (nodequeue_load_nodes($sqid, $backward = FALSE, $from = 0, $count = 0, $published_only = TRUE) as $position => $node) {
      $this->nodes_in_queue[$node->nid] = $node;
      $this->nodes_in_queue[$node->nid]->position = $position;
      $this->positions[$position] = $node;
    }
  }
  
  public function getNext($nid) {
    $next = $this->nodes_in_queue[$nid]->position + 1;
    if (count($this->nodes_in_queue)-1 == $this->nodes_in_queue[$nid]->position) { // last item on the list
      if ($this->wrap) {
        $next = 0;
      } else {
        return NULL;
      }
    }
    return $this->positions[$next]->nid;
  }

  public function getPrevious($nid) {
    $previous = $this->nodes_in_queue[$nid]->position - 1;
    if ( $previous == -1 ) {  // first item on the list
      if ($this->wrap) {
        $previous = count($this->nodes_in_queue)-1;
      } else {
        $previous = NULL;
      }
    }
    return $this->positions[$previous]->nid;
  }
}